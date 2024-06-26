import express from 'express';
import Item from '../schemas/items.schema.js';

const router = express.Router();

// 아이템 생성 Create
router.post('/item', async (req, res) => {
  try {
    const { itemCode, itemName, itemStat } = req.body;
    const item = new Item({
      itemCode,
      itemName,
      itemStat,
    });
    await item.save();

    res.status(201).send(item);
  } catch (error) {
    console.error('Error creating item: error');
    res.status(500).json({ message: 'Failed to create item' });
  }
});

// 아이템 정보 변경 Update
router.put('/item/:itemCode', async (req, res) => {
  const itemCode = parseInt(req.params.itemCode, 10);
  const { itemName, itemStat } = req.body;

  const updatedItem = await Item.findOneAndUpdate(
    { itemCode },
    { itemName, itemStat },
    { new: true }
  );

  if (!updatedItem) {
    return res
      .status(404)
      .json({ message: 'Item with Code ${itemCode} not found' });
  }

  res.status(200).json(updatedItem);
});

// 아이템 목록 조회 Read
router.get('items', async (req, res) => {
  try {
    const items = await Item.find({}, 'itemCord itemName -_id');
    res.status(200).json(items);
  } catch (error) {
    console.errer('Error retrieving items', error);
    res.status(500).json({ message: 'Error retrieving items from database' });
  }
});

// 아이템 상세 조회 Read
router.get('/items/:itemCode', async (req, res) => {
  try {
    const itemCode = parseInt(req.params.itemCode, 10);
    const item = await Item.findOne({ itemCode }).exec();

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const itemDetailInfo = {
      itemCode: item.itemCode,
      itemName: item.itemName,
      itemStat: item.itemStat,
    };
    res.status(200).json({ itemDetailInfo });
  } catch (error) {
    console.errer('Error retrieving items', error);
    res.status(500).json({ message: 'Error retrieving items from database' });
  }
});

export default router;
