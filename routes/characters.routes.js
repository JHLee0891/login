import express from 'express';
import Character from '../schemas/characters.schemas.js';

const router = express.Router();

//캐릭터 생성 Create
router.post('/characters', async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: 'Invalid request; Name is required' });
    }

    const { name } = req.body;
    const prevCharacter = await Character.findOne().sort('-characterId').exec();

    if (prevCharacter && name == prevCharacter.name) {
      return res.status(400).json({
        message: 'Dublicate namee: A character with this name already exists',
      });
    }

    const characterId = prevCharacter ? prevCharacter.characterId + 1 : 1;
    const character = new Character({
      name,
      characterId,
    });

    await character.save();

    return res.status(201).json({ characterId });
  } catch (error) {
    console.error('Faild to create character', error);
    res
      .status(500)
      .json({ message: 'Server error: Failed to create character' });
  }
});

// 캐릭터 조회 Read
router.get('/characters/:characterId', async (req, res) => {
  try {
    const characterId = parseInt(req.params.characterId, 10);
    const character = await Character.findOne({
      characterId,
    }).exec();

    if (!character) {
      return res
        .status(404)
        .json({ message: 'Character with Id ${characterId} not found' });
    }

    return res.status(200).json({
      name: character.name,
      health: character.health,
      power: character.power,
    });
  } catch (error) {
    console.error('Faild to create character', error);
    res
      .status(500)
      .json({ message: 'Server error: Failed to create character' });
  }
});

// 캐릭터 삭제 Delete
router.delete('/characters/:characterId', async (req, res) => {
  try {
    const characterId = parseInt(req.params.characterId, 10);
    const character = await Character.findOne({
      characterId,
    }).exec();

    if (!character) {
      return res
        .status(404)
        .json({ message: 'Character with Id ${characterId} not found' });
    }

    await Character.deleteOne({ characterId }).exec();

    return res.status(200).json({ message: 'Character deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Failed to delete character' });
  }
});

export default router;
