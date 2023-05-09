// const express = require("express");
// //Let's set up an express app:
// const app = express() // we're creating an instance (app) of the function express

// //register view engine:
// app.set('view engine', 'ejs');


// //Listen for requests:
// app.listen(3000);

// app.get('/',(req,res)=> {
//     // res.send("<em>Home page</em>");//This automatically sets the header content type to text/html 
//     res.sendFile("./views/index.html",{root:__dirname});
//     console.log(res.statusCode);
// })
// app.get('/about',(req,res)=> {
//     // res.send("<em>Home page</em>");//This automatically sets the header content type to text/html 
//     res.sendFile("./views/about.html",{root:__dirname})
// })
// // app.get('/about',(req,res)=> {
// //     res.send("<em>About page</em>");//This automatically sets the header content type to text/html 
// // })

// //Redirects
//  app.get('/about-us', (req,res) => {
//     res.redirect("./about");
//     console.log(res.statusCode)
//  })

// //404 page, this should always be at bottom, to not stop trying to match urls with html pages
// app.use((req,res)=> {
//     res.status(404).res.sendFile("./views/404.html", {root: __dirname});
// })















//Let's code the blog:
//Required modules:
const mongoose = require("mongoose");
//We want to import the Blog model:
const Blog = require("./models/blog");

const express = require("express");
console.log("App has started............................................................................");
//Let's set up an express app:
const app = express(); 
//Connect to mongodb:
const dbURI = "mongodb+srv://mk_st:Mike007*@mikmo.tehtdgz.mongodb.net/mikmo?retryWrites=true&w=majority";
//connextion trough mongoose:
//To avoid deprecations, we may first add this:
mongoose.set('strictQuery', false);
//To avoid deprecation warnings, we also can add a second argument to connect method,which is an object
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  //We only want to listen to a request, when the connection to the database is established
.then((data) => {
  app.listen(3000)
  console.log("connected to database and listening to port 3000")
}).catch((err)=> console.log("We've got an error: ", err))




//register view engine:

app.set('view engine', 'ejs');
//By default, ejs files are stored in views folder, let's change the folder:
app.set("views", "ejs views");

// //Listen for requests:
// app.listen(3000);

//Let's create some middlewares:
// app.use((req, res, next)=> {
//     console.log('new request made: ');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })
//Middlewares & Static files:
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

// app.use((req, res, next)=> {
//   console.log('In the next middleware: ');
//   next();
// })

//Routes:

//Mongoose and Mongo sandbox routes:
// app.get("/add-blog", (req,res)=> {
//   const blog = new Blog({
//     title: 'new blog',
//     snippet: "about my nex blog",
//     body: 'more about my new blog'
//   });
//   //Let's save the blog created:
//   blog.save()
//   .then((data) => {
//     res.render(data)
//     console.log(data)
//   })
//   .catch((err) => {
//     res.render(err)
//     // console.log(err)
//   });
// })

// //Let's get all blogs:
// app.get("/all-blogs", (req,res) => {
//     Blog.find()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err)=> {
//       console.log(err)
//     })
// })

// //Let's get one single blog:
// app.get("/single-blog", (req,res) => {
//   Blog.findById("63fbc446d2aaa2170b3411f8")
//   .then((data) => {
//     res.send(data);
//   })
//   .catch((err)=> {
//     console.log(err)
//   })
// })

app.get('/',(req,res)=> {
    //Array blogs to render: 
    const blogs = [
        {
          title: "The Future of Artificial Intelligence",
          author: "Mike",
          content: "Artificial Intelligence is revolutionizing the way we live and work. In this blog post, we explore the latest developments in AI and what the future holds for this exciting technology."
        },
        {
          title: "5 Tips for Securing Your Online Accounts",
          author: "Beni",
          content: "With so much of our lives online, it's more important than ever to keep our accounts secure. In this blog post, we share 5 tips for keeping your online accounts safe from hackers and cyber attacks."
        },
        {
          title: "How Blockchain is Changing the World",
          author: "ken",
          content: "Blockchain is a decentralized ledger technology that is transforming the way we store and share data. In this blog post, we explore the many ways that blockchain is changing the world and revolutionizing industries." 
        }
      ];
    
    Blog.find()
    .then((data) => {
      res.render("index",{title: "Home", blogs: data})
    })
    .catch((err) => {
      console.log(err)
    })

})
app.get('/about',(req,res)=> { 
    res.render("about",{title: "About"})
})

//Blog routes:
app.get("/blogs", (req,res) => {
  Blog.find().sort({createdAt : -1})
  .then((data)=> {
    res.render('index', {title : 'All blogs', blogs: data})
  })
  .catch((err)=> {
    console.log(err);
  })
})

//Detele request:
app.delete("/blogs/:id", (req,res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
  .then((data) => {
    res.json({redirect: '/blogs'})
  })
  .catch((err) => {
    console.log(err);
  })
})


//Post requests:
// app.post("/blogs", (req,res) => {
//     console.log(req.body);
//     // const blog = new Blog(req.body);
//     // console.log(blog);
//     // console.log("it's all");

//     // blog.save()
//     // .then((data) => {
//     //   res.redirect('/blogs')
//     // })
//     // .catch((err) => {
//     //   console.log(err);
//     // })
// })
// handle POST requests to "/"
app.post('/blogs', (req, res) => {
  // the data from the form will be in req.body
  // console.log(req.body);
  // res.send(req.body);
//New instance:
  const blog = new Blog(req.body);
  blog.save()
  .then((data)=> {
    res.redirect('/blogs');   
  })
  .catch((err) => {
    console.log(err)
  })

});

//Let's handle routes parameters:
app.get("/blogs/:id", (req,res) => {
  //Let's get the id paramater from the url:
  const id = req.params.id;
  // console.log(id);
  Blog.findById(id)
  .then((data) => {
    res.render("details", {blog: data, title: 'Blog details'});
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get('/create-blog',(req,res)=> { 
    res.render("create",{title: "Create"})
})

app.use((req,res)=> {
    res.status(404).render('404',{title: "404"})}
)