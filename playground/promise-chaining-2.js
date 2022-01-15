require('../src/db/mongoose');
const Task = require('../src/models/task');


// Task.findByIdAndDelete("61d5d07793a55da240820644").then(() => {
//     return Task.countDocuments({completed:false})
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })


const deleteAndCount = async (id, completed) => {
    await Task.findByIdAndDelete(id);
    const countIncomplete = await Task.countDocuments({completed});

    return countIncomplete;
}

deleteAndCount("61d57402b638866ce4e1a308", false).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})