# Photo selections from the two chat batches

All 38 displayed photos were assessed visually. Batch A is the first message (19 photos); batch B is the final message (19 photos). Numbers below follow display order, not camera filenames. The chat images have not been exposed as downloadable files or workspace attachments, so these are **planned selections, not imported assets**. No original filenames are inferred from the display order.

## Homepage and albums

| Slot | Selection | Description / intended alt text |
| --- | --- | --- |
| hero | A15 | Bhavya smiling with her eyes closed in a mint embroidered outfit outdoors at night |
| expressions | A5 | Bhavya looking up with a playful expression in a maroon outfit |
| smile | A4 | Bhavya smiling up at the camera on a leaf-covered street |
| hats | B3 | Young Bhavya smiling in a colourful hat in a shop |
| peace | B11 | Young Bhavya crouching in a stone alcove and making two peace signs |
| coconut | B1 | Young Bhavya drinking coconut water through a straw |
| tradition | B6 | Young Bhavya holding her palms together in a colourful traditional outfit |
| outing | B9 | Young Bhavya smiling with her arms stretched out beside a shop counter |
| beach | A7 | Bhavya sitting in a white outfit beside the sea |
| gallery | A10 | Bhavya looking over her shoulder in a red outfit in an art gallery |
| mountains | A13 | Bhavya in a blue striped shirt looking toward a mountain view |
| forest | A18 | Bhavya posing with her hands on her hips among tall trees |

## Ten scrapbook pages

| Slot / page | Selection | Reason |
| --- | --- | --- |
| love-01 / Your smile | A4 | A clear, spontaneous smile and a different viewpoint |
| love-02 / Those expressions | B17 | Playful pursed lips, glasses and maroon outfit |
| love-03 / Your kind of beautiful | A9 | Smiling festive portrait with statement earrings |
| love-04 / Your everyday magic | A14 | Casual portrait in a cream fleece jacket |
| love-05 / The little mischief | A19 | Playful brass-cup moment in a green floral sweater |
| love-06 / Your effortless style | A12 | Gold festive outfit and jewellery |
| love-07 / Little you | B4 | Childhood laughter with pink colour on her forehead, on a balcony |
| love-08 / Your sense of adventure | A7 | Beach portrait with the whole scene retained |
| love-09 / All your possibilities | A10 | Her red-outfit gallery portrait; no achievement or graduation inferred |
| love-10 / Simply being Bhavya | A11 | Playful outdoor selfie in a pink-and-yellow outfit |

This fills 22 slots with 19 distinct photographs. Reusing three favourites connects the album and scrapbook without requiring extra uploads.

## Assessment of the other photos

- A1, A2, A3 and A8: social-media, camera or call screenshots. A1 includes unrelated interface text; A2 and A8 include a second caller; A3 has grid lines across the photo. Clean alternatives already cover their uses, so omit these screenshots.
- A6: warm café portrait; a good alternate hero or everyday portrait, held in reserve to keep the initial album focused.
- A16 and A17: good night portrait and playful close-up; the smile and expressions selections give the current pages more variety.
- B2: childhood white-dress photo with haze and low contrast; retain as an original, use clearer childhood choices in the initial album.
- B5, B7, B8, B10, B13, B14, B15 and B16: childhood outings and family moments; preserve as supplied, hold in reserve rather than making this birthday album primarily a group-photo collection. Do not infer family identities.
- B12: childhood café moment in a yellow top; a good reserve for the childhood album.
- B18: couple portrait; keep in reserve for the letter if desired, while the main photo selections celebrate her.
- B19: childhood studying moment; a lovely alternate childhood selection, held in reserve because the current five album slots are filled.

## Import requirements

Upload the same original photos as a ZIP or downloadable image-file attachments. No more photo choices or new photos are needed. Preserve original files outside `public/`; resize and encode only selected derivatives, retain the full frame, and do not retouch faces, change outfits, or invent details. Verify each downloadable file visually before mapping it to a slot, since the chat order does not establish its filename.

Update source filenames and accurate alt text in `src/data/media-manifest.json`, prepare the 22 derivatives, run the media audit, rebuild, and verify all ten scrapbook images on mobile and desktop. Commit only the selected derivatives explicitly; the raw originals and reserve photos stay outside the deployed site.

Videos remain optional and have not been supplied as downloadable files. The two existing video slots can remain hidden until actual clips arrive.
