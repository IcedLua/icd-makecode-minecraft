let chest = world(0, -65536, 0)
let hopperWarningLockout = false

// Logic Helpers
function degreesToCompass(degrees: number): CompassDirection {
    let d = (degrees % 360 + 360) % 360; // Be NORMAL(ized)

    if (d >= 45 && d < 135) return CompassDirection.West;
    if (d >= 135 && d < 225) return CompassDirection.North;
    if (d >= 225 && d < 315) return CompassDirection.East;
    return CompassDirection.South;
}

function isHopper(detected: Item) {
    return detected == Item.Hopper
}

// Game Helpers
function tellOwner(text: string) {
    player.tell(mobs.target(TargetSelectorKind.LocalPlayer), text)
}

function throwInHopper() {
    let startPos = agent.getPosition()
    let startOrientation = agent.getOrientation()

    if (chest.getValue(Axis.Y) != -65536) { // Arbitrary impossible number
        agent.teleport(chest, 0)
        if (isHopper(agent.inspectBlock(SixDirection.Down))) {
            agent.dropAll(SixDirection.Down)
        }
        agent.teleport(startPos, degreesToCompass(startOrientation))
        return true
    } else {
        agent.teleport(startPos, degreesToCompass(startOrientation))
        if (!hopperWarningLockout) {
            tellOwner("Inventory is full! Assign a hopper.")
            hopperWarningLockout = true
        }
        return false
    }
}

player.onChat("#help", function () {
    tellOwner(`Icd Agent::Miner instructions
    Hello ${player.name()}!
    Commands list (all args are numbers):
    #sethopper - Sets an itemdump for when items fill up
    #bring - Brings agent to your position
    #turn [times] - Turns right x times
    #shaft [depth] [size] - Mines a shaft down
    #stripmine [length] - Stripmines for x blocks
    #empty - Throws all items into set hopper`)
})

player.onChat("#sethopper", function() {
    let startPos = agent.getPosition()
    let startOrientation = agent.getOrientation()
    agent.teleportToPlayer()
    let detected = agent.inspectBlock(SixDirection.Down)
    if (isHopper(detected)) {
        chest = agent.getPosition()
    } else {
        tellOwner("That's not a hopper. (Stand on a hopper)")
        agent.destroy(SixDirection.Down)
    }
    agent.teleport(startPos, degreesToCompass(startOrientation))
})

player.onChat("#bring", function() {
    agent.teleportToPlayer()
})

player.onChat("#turn", function(times) {
    for (let i = 0; i < times; i++) {
        agent.turnRight()
    }
})

player.onChat("#shaft", function (depth, size) {
    let finalSize = size % 2 === 0 ? size + 1 : size;
    let offset = (finalSize - 1) / 2;

    tellOwner(`Agent is digging a ${finalSize}x${finalSize} shaft...`);

    agent.destroy(SixDirection.Down)
    agent.move(SixDirection.Down, 1) // Otherwise he'd just beat around the bush punchin air...

    agent.destroy(SixDirection.Forward)
    agent.move(SixDirection.Forward, offset)
    agent.turnLeft()
    agent.destroy(SixDirection.Forward)
    agent.move(SixDirection.Forward, offset)
    agent.turnRight()
    agent.turnRight()

    for (let d = 0; d < depth; d++) {
        for (let i = 0; i < finalSize; i++) {
            for (let j = 0; j < finalSize - 1; j++) {
                agent.destroy(SixDirection.Forward)
                agent.move(SixDirection.Forward, 1)
            }

            if (i < finalSize - 1) {
                if (i % 2 == 0) {
                    agent.turnRight()
                    agent.destroy(SixDirection.Forward)
                    agent.move(SixDirection.Forward, 1)
                    agent.turnRight()
                } else {
                    agent.turnLeft()
                    agent.destroy(SixDirection.Forward)
                    agent.move(SixDirection.Forward, 1)
                    agent.turnLeft()
                }
            }

            if (!agent.collectAll()) {
                throwInHopper()
            }
        }

        agent.destroy(SixDirection.Down)
        agent.move(SixDirection.Down, 1)

        agent.turnRight()
        agent.turnRight()
    }
    hopperWarningLockout = false
})

player.onChat("#stripmine", function(length) {
    for (let i = 0; i < length; i++) {
        agent.destroy(SixDirection.Forward)
        agent.move(SixDirection.Forward, 1)
        agent.destroy(SixDirection.Up)
        if (!agent.collectAll()) {
            throwInHopper()
        }
    }
    hopperWarningLockout = false
})

player.onChat("#empty", function() {
    throwInHopper()
    hopperWarningLockout = false
})

// Initalization?
tellOwner("Icd Agent::Miner is ready!")
