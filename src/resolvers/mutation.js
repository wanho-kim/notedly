const { models } = require('mongoose');

module.exports = {
  newNote: async (parent, { content }, { models }) => {
    return await models.Note.create({
      content: content,
      author: 'Wanho Kim'
    });
  },
  deleteNote: async (parent, { id }, { modles }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          content
        }
      },
      {
        new: true
      }
    );
  }
};
