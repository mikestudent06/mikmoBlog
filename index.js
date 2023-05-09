// //Node modules:
// const http = require('http');
// const fs = require('fs');
// const _ = require("lodash");

// const server = http.createServer((req,res)=> {
//     // console.log(req.url,"\n", req.method);

//     //lodash:
//     const random_number = _.random(4,5)
//     console.log(random_number)
//     //with lodash we can allow a function to be called only once:
//     const sayHelloOnce = _.once(()=> {
//         return console.log("hello there")
//     })

//     sayHelloOnce()
//     sayHelloOnce() //This line is not allowed to call the function sayHelloOnce anymore
    

//     //set header content type:
//     // res.setHeader("Content-Type", "text/plain")
//     // res.setHeader("Content-Type", "text/html")
//     // res.write("<strong>Hello Michael</strong>")    
//     // res.end()

//     //Send an html file:
//     // const pages = ["./views/index.html", "./views/about.html"];
//     // pages.map((page)=> {
//     //     fs.readFile(page,(err,data)=> {
//     //         (err) ? res.write(err) : res.write(data);
//     //     })
//     // })

//     // fs.readFile("./views/index.html", (err,data)=> {
//     //     (err) ? res.write(err) : res.end(data);//res.write(data)
//     //     // res.end()
//     // })

//     let path = "./views/";

//     switch (req.url) {
//         case "/":
//             path += "index.html"
//             res.statusCode = 200;
//             break;
//             case "/about":
//                 path += "about.html" 
//                 res.statusCode = 200;
//             break;
//             //Redirect:
//             case "/about-me":
//                 res.statusCode = 302;
//                 res.setHeader('Location', '/about')
//                 res.end()
//             break;
            
//         default:
//             path += "404.html"
//             res.statusCode = 404;
//             break;
//     }
//         fs.readFile(path, (err,data) => {
//         (err) ? res.write(err) : res.write(data);
//         res.end()
//     })
// })
// server.listen(3000,"localhost", ()=> {
//     console.log("Listening for request on port 3000");
// })