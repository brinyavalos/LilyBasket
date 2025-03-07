const items = require('../models/items');

exports.getAllItems = (req, res) => {
    // Filter for active items only
    const activeItems = items.filter(item => item.active);
    
    // Sort by price in ascending order
    const sortedItems = [...activeItems].sort((a, b) => a.price - b.price);
    
    res.render('items', { items: sortedItems });
};

exports.getItemById = (req, res) => {
    const item = items.find(i => i.id === req.params.id);

    if (!item) {
        return res.status(404).render('error', { message: 'Item not found' });
    }

    res.render('item', { item });
};

exports.searchItems = (req, res) => {
    const searchTerm = req.query.q.toLowerCase();
    
    // Filter active items that match the search term in title or details
    const searchResults = items.filter(item => 
        item.active && 
        (item.title.toLowerCase().includes(searchTerm) || 
         item.details.toLowerCase().includes(searchTerm))
    );
    
    // Sort results by price
    const sortedResults = [...searchResults].sort((a, b) => a.price - b.price);
    
    res.render('items', { items: sortedResults });
};

exports.showNewItemForm = (req, res) => {
    res.render('new');
};

exports.createNewItem = (req, res) => {
    // Generate a unique ID based on the arrangement name
    const id = req.body['arrangement-name']
        .toLowerCase()
        .replace(/\s+/g, '-')  // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, '');  // Remove non-alphanumeric characters
    
    // Create new item object
    const newItem = {
        id: id,
        title: req.body['arrangement-name'],
        seller: req.body['seller-name'],
        condition: req.body.condition,
        price: parseFloat(req.body.price),
        details: req.body.description,
        // Use a default image path since we're not handling file uploads
        image: "/images/flower-default.jpeg",
        active: true
    };
    
    // Add new item to the items array
    items.push(newItem);
    
    // Redirect to items page
    res.redirect('/items');
};
exports.showEditForm = (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    
    if (!item) {
        return res.status(404).render('error', { message: 'Item not found' });
    }
    
    res.render('edit', { item });
};

exports.updateItem = (req, res) => {
    const itemIndex = items.findIndex(i => i.id === req.params.id);
    
    if (itemIndex === -1) {
        return res.status(404).render('error', { message: 'Item not found' });
    }
    
    // Update the item properties
    items[itemIndex].title = req.body.title;
    items[itemIndex].seller = req.body.seller;
    items[itemIndex].condition = req.body.condition;
    items[itemIndex].price = parseFloat(req.body.price);
    items[itemIndex].details = req.body.details;
    
    // Redirect to the item details page
    res.redirect(`/items/${req.params.id}`);
};

exports.deleteItem = (req, res) => {
    const itemIndex = items.findIndex(i => i.id === req.params.id);
    
    if (itemIndex === -1) {
        return res.status(404).render('error', { message: 'Item not found' });
    }
    
    // Instead of removing the item from the array, set active to false
    items[itemIndex].active = false;
    
    // Redirect to the items page
    res.redirect('/items');
};