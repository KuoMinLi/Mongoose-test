const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const headers = require('./headers.js');
const {successHandler, errorHandler} = require('./handlers.js');
const ETFList = require('./models/ETFList.js');
const ETFContent = require('./models/ETFContent.js');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => {
  console.log('資料庫連線成功!!');
})


const requestListener = async (req, res) => {
  let body = '';
  req.on('data', (chunk) => body += chunk);


  //測試 ETF 關聯性OK
  if (req.method === 'GET' && req.url.startsWith('/etfcontent/')) {
      try {
        const id = req.url.split('/').pop();
        console.log(id);
        const etfcontent = await ETFContent.find({ETFList: id }).populate({
          path: 'ETFList',
          select: ['name', 'code']
        });
        successHandler(res, etfcontent);
      } catch (err) {
        errorHandler(res, '取得資料失敗1');
      }
  } else if (req.method === 'GET' && req.url === '/etfcontent') {
      try {
        const etfcontent = await ETFContent.find();
        successHandler(res, etfcontent);
      } catch (err) {
        errorHandler(res, '取得資料失敗');
      }
  } else if (req.method === 'POST' && req.url === '/etfcontent') {
    req.on('end',async() => {
      try {
        const { ETFList, name, code, industry, percentage  } = JSON.parse(body);
        console.log(ETFList, name, code, industry, percentage);
        const etfcontent = await ETFContent.create({ ETFList, name, code, industry, percentage });
        successHandler(res, etfcontent);
      } catch (err) {
        errorHandler(res, '新增資料失敗');
      }
    });
  } else if (req.method === 'POST' && req.url === '/etflist') {
    req.on('end',async() => {
      try {
        const { name, code, custodyFee, managementFee, category } = JSON.parse(body);
        const etflist = await ETFList.create({ name, code, custodyFee, managementFee, category});
        successHandler(res, etflist);
      } catch (err) {
        errorHandler(res, '新增資料失敗1');
      }
    });

    
  // if (req.method === 'GET' && req.url === '/todos') {
  //   try {
  //     const todos = await Todo.find();
  //     successHandler(res, todos);
  //   } catch (err) {
  //     errorHandler(res, '取得資料失敗');
  //   }
  // } else if (req.method === 'POST' && req.url === '/todos') {
  //   req.on('end',async() => {
  //     try {
  //       const data = JSON.parse(body);
  //       const newTodo = await Todo.create({
  //         title: data.title,
  //         done: false,
  //       });
  //       successHandler(res, newTodo);
  //     } catch (err) {
  //       errorHandler(res, err.errors);
  //     }
  //   })
  // } else if (req.method === 'DELETE' && req.url === '/todos' ) {
  //   await Todo.deleteMany({});
  //   successHandler(res, '刪除成功');
  // } else if (req.method === 'DELETE' && req.url.startsWith('/todos/')) {
  //   try {
  //     const toDoId = req.url.split('/').pop();
  //     await Todo.findByIdAndDelete(toDoId);
  //     successHandler(res, '刪除成功');
  //   } catch (err) {
  //     errorHandler(res, '刪除失敗，請確認 id 是否正確');
  //   }
  //   } else if (req.method === 'PATCH' && req.url.startsWith('/todos/')) {
  //     req.on('end', async()=>{
  //       try {
  //         const toDoId = req.url.split('/').pop();
  //         const data = JSON.parse(body);
  //         await Todo.findByIdAndUpdate(toDoId, {
  //           title: data.title,
  //         });
  //         successHandler(res, '更新成功');
  //       } catch (err) {
  //         errorHandler(res, '更新失敗，請確認 id 是否正確');
  //       }
  //     })
  //   } else if (req.method === 'OPTIONS' && req.url === '/todos'){
  //     successHandler(res, 'OPTIONS');
    } else {
      res.writeHead(404, headers);
      res.write(JSON.stringify({
        status: 'false',
        data: '404 Not Found',
      }));
      res.end();
    }
}

http.createServer(requestListener).listen(process.env.PORT);
