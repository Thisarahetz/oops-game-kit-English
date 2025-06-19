# oops-game-kit

### Introduction
A game project development template based on Oops Framework, providing the latest version of Cocos Creator 3.x plugins and common game resource initialization logic.

### Using Oops Framework to Create a Game Template Project
1. Download the template project
```
git clone 
```

2. Download framework plugins
#### Windows
- Execute update-oops-plugin-framework.bat to clone and update the framework plugin
- Execute update-oops-plugin-hot-update.bat to clone and update the hot update plugin
- Execute update-oops-plugin-excel-to-json.bat to clone and update the Excel to Json format plugin

#### Mac
- Execute update-oops-plugin-framework.sh to clone and update the framework plugin
- Execute update-oops-plugin-hot-update.sh to clone and update the hot update plugin
- Execute update-oops-plugin-excel-to-json.sh to clone and update the Excel to Json format plugin

### Template Project Directory Structure
```
res                         - Static resources referenced by prefabs
resources                   - Dynamically loaded resources
    audio                       - Music resources
    common                      - Common resources
    config                      - Configuration resources
        game                        - Game custom content configuration tables
        config.json                 - Framework default configuration (extensible)
    content                     - Custom dynamic loading content resources
    game                        - Core gameplay content resources
    gui                         - Interface resources
        loading                     - Initial game loading interface
    language                    - Multi-language resources
script                      - Game scripts
    game                        - Game business modules
        common                      - Game common modules
            config                      - Game configuration
                GameEvent.ts                - Global event configuration
                GameUIConfig.ts             - UI window configuration (config data for oops.gui module)
            table                       - Game configuration table objects (can be auto-generated via oops-plugin-excel-to-json)
        initialize                  - Game initialization module
        SingletonModuleComp.ts      - Game singleton business module
    Main.ts                     - Game entry script
```

Based on the above directory structure, when developing games, resources can be managed by storing them in corresponding folders. This template project comes with the following essential game features:
- Screen adaptation
- Game local configuration data retrieval
- Game URL query parameter retrieval
- Game initialization business process
    - Customizable initial resource loading interface
- Loading and displaying the first custom game interface

### Screen Adaptation
Cocos Creator Menu -> Project -> Project Settings
#### Landscape Adaptation
![](https://oops-1255342636.cos.ap-shanghai.myqcloud.com/img/kit/1.jpg)

#### Portrait Adaptation
![](https://oops-1255342636.cos.ap-shanghai.myqcloud.com/img/kit/2.jpg)

After setting this up, leave the rest to the framework to handle automatically.

### Game Initialization Module
#### Essential Resources Loaded at Game Launch
initialize/bll/InitRes.ts

This script manages essential resources loaded at game launch. Note that resources configured here should be kept minimal to avoid long black screen periods during the no-prompt loading phase, which could degrade game experience.
- Load common resources
- Load language packs (optional)
- Load custom resources (optional)

initialize/view/LoadingViewComp.ts

This script controls the game content resource loading interface. Game content resources are typically large, so a loading progress bar is used to improve user experience. After all resources are loaded, the first custom game interface is displayed by executing:
```
oops.gui.open(UIID.Demo);
```

### QQ Groups
- 798575969 (Group 1 - Full)
- 621415300 (Group 2 - Full)
- 628575875 (Group 3 - Full)
- 226524184 (Group 4 - Recommended)
- 741197640 (Group 5 - Recommended)

### QQ Channel: q366856bf5

### [Click to learn about other products by the author](https://store.cocos.com/app/search?name=oops)