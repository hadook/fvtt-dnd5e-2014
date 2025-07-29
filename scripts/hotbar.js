Hooks.once("ready", async () => {
    const hidden = game.settings.get("hadook-dnd5e-2014", "hideHotbar");
    const hotbarElement = document.getElementById("hotbar");
    if (hotbarElement) hotbarElement.style.display = hidden ? "none" : "";
});

Hooks.once("init", () => {
    game.settings.register("hadook-dnd5e-2014", "hideHotbar", {
        name: "Hide Hotbar",
        hint: "Hides the hotbar UI. The hotbar remains functional when hidden, macros can still be executed via keybinds.",
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
        onChange: value => {
            const hotbarElement = document.getElementById("hotbar");
            if (hotbarElement) hotbarElement.style.display = value ? "none" : "";
        },
        requiresReload: false,
    });
});
