const PACK_NAME = "hadook-dnd5e-2014.monsters";
const OLD_PATH = "hadook-dnd5e-compendia";
const NEW_PATH = "hadook-dnd5e-2014";

const pack = game.packs.get(PACK_NAME);
if (!pack) return ui.notifications.error("Pack not found.");

const actors = await pack.getDocuments();
const updates = [];

for (const actor of actors) {
  const changes = {};

  // Check img
  if (actor.img?.includes(OLD_PATH)) {
    changes.img = actor.img.replace(OLD_PATH, NEW_PATH);
  }

  // Check prototypeToken.texture.src
  const tokenTex = actor.prototypeToken.texture?.src;
  if (tokenTex?.includes(OLD_PATH)) {
    changes["prototypeToken.texture.src"] = tokenTex.replace(OLD_PATH, NEW_PATH);
  }

  // Check prototypeToken.ring.subject.texture
  const ringTex = actor.prototypeToken?.ring?.subject?.texture;
  if (ringTex?.includes(OLD_PATH)) {
    changes["prototypeToken.ring.subject.texture"] = ringTex.replace(OLD_PATH, NEW_PATH);
  }

  if (Object.keys(changes).length > 0) {
    updates.push({
      _id: actor.id,
      ...changes
    });
  }
}

if (updates.length > 0) {
  console.log(`Updating ${updates.length} actors...`);
  await pack.documentClass.updateDocuments(updates, { pack: PACK_NAME });
  ui.notifications.info(`Updated ${updates.length} actors in pack.`);
} else {
  ui.notifications.info("No changes needed.");
}
