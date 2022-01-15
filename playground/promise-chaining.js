require('../src/db/mongoose');
const User = require('../src/models/user');


// User.findByIdAndUpdate("61d59f7c9bad74cbfe099c6a", {age: 22}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 22})
// }).then((result) => {
//     console.log(result);
// }).catch(() => {})


const updateAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});

    return count;
}

updateAndCount("61d582db85b46d52238ce421", 5).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});