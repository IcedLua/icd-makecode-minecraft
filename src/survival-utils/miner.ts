function tellOwner(text: string) {
    player.tell(mobs.target(TargetSelectorKind.LocalPlayer), text)
}

player.onChat("#help", function() {
    tellOwner(`Icd Agent::Miner instructions
    Hello ${player.name()}!
    Commands list (all args are numbers):
    #bring [dir] - Brings agent to your position, dir being a number denoting a compass direction
    #shaft [depth] [size] - mines a shaft down`)
})

player.onChat("#bring", function(dir) {
    agent.teleportToPlayer()
    agent.turn(dir)
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
        }

        agent.collectAll() // Probs faster to run it less
        agent.destroy(SixDirection.Down)
        agent.move(SixDirection.Down, 1)

        agent.turnRight()
        agent.turnRight()
    }
})

// Initalization?
tellOwner("Icd Agent::Miner is ready!")
