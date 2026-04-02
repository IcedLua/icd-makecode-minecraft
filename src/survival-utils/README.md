# Survival Utilities

## Miner Script

The **Miner** module automates resource gathering through precise agent movements. It features a smart "Inventory Dump" system to ensure your agent never stops working due to a full inventory.

### Setup

To use the automated unloading feature, you must first designate a "Itemdump" location. This allows the agent to return and empty its inventory once it hits capacity.

**Recommended Itemdump Setup:**

|  Automated Setup | System Description |
| :--- | :--- |
| <img src="https://github.com/user-attachments/assets/0e314a0d-3898-4a52-a648-8dd8198c26c6" width="300" /> |1.  Place a `hopper`<br>2. Surround it in a ring of blocks (so the items don't pour out)<br>3. Place your storage below|
| <img width="300" alt="image" src="https://github.com/user-attachments/assets/29fadd2d-0010-449a-ab6e-e4b0fe332259" /> | 1. Make a simple `powered rail` loop<br>2. Put some `hopper minecarts`<br>3. Add `chests` for collection |

Alternative redstone setup (items sit for less time)


-----

### Commands

All arguments below are numbers

| Command | Argument(s) | Description |
| :--- | :--- | :--- |
| `#bring` | None | Teleports the agent to your player. |
| `#sethopper` | None | Sets the agent's "itemdump" |
| `#empty` | None | Agent travels to the set hopper and drops all inventory items. |
| `#turn` | `[times]` | Rotates the agent 90° clockwise multiple times. |
| `#shaft` | `[depth] [size]` | Mines a square vertical hole downwards. |
| `#stripmine` | `[length]` | Mines a 1x2 tunnel forward for the specified distance. |


(README TEMPORARILY WRITTEN WITH GEN-AI. Sorry...)
