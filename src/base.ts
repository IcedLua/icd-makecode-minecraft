function tellOwner(text: string) {
    player.tell(mobs.target(TargetSelectorKind.LocalPlayer), text)
}

player.onChat("#help", function() {
    tellOwner(`Icd Agent::def instructions
    Hello ${player.name()}!
    Commands list (all args are numbers):
    #xyz [abc] - jkl`)
})

player.onChat("#bring", function() {
    agent.teleportToPlayer()
})

player.onChat("#turn", function(times) {
    for (let i = 0; i < times; i++) {
        agent.turnRight()
    }
})
