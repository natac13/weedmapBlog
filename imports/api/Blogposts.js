import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const Blogposts = new Mongo.Collection('blogposts');
export default Blogposts;

if (Meteor.isServer) {
  Meteor.publish('blogposts', function blogpostPublication() {
    return Blogposts.find();
  });
}

// Meteor.methods({
//   'blogposts.insert'(title, entry) {
//     check(title, String);
//     check(entry, String);

//     if (!this.userId) {
//       throw new Meteor.Error('User not logged in.');
//     }

//     Blogposts.insert({
//       title,
//       entry,
//       createdAt: new Date(),
//       owner: this.userId,
//       username: Meteor.users.findOne(this.userId).username,
//     });
//   },
//   'blogposts.remove'(blogpostsId) {
//     const task = Blogposts.findOne(blogpostsId);
//     if (task.owner !== this.userId) {
//       throw new Meteor.Error('Cannot delete, You are not the owner of this blogpost.');
//     }
//     check(blogpostsId, String);
//     Blogposts.remove(blogpostsId);
//   },
// });
