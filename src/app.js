const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();
port = 8000;
Account = 'Accounts';
RideDetails = 'RideDetails';
TableDetails = 'TableDetails';
RoomDetails = 'RoomDetails';
const admin = require('firebase-admin');
require('dotenv').config();
let username1;
admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
    })
});

const db = admin.firestore();




// Example function to get all items from Firestore
async function getItems(collection, objectArray1) {
  try {
    const snapshot = await db.collection(collection).get();
    snapshot.forEach(doc => {
    //   console.log(`${doc.id} =>`, doc.data());
    //   console.log(doc.data().quantity);
      objectArray1.push({
            docid: doc.id,
            email: doc.data().email,
            username: doc.data().username,
            password: doc.data().password
        });
    });
  } catch (error) {
    console.error('Error getting documents:', error);
  }
}


const templatePath = path.join(__dirname,"./Templates");

msgggg = "";
app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/images",express.static(path.join(__dirname,"../images")));


let Login = false;

app.get('/',async (req,res)=>
{
  if(Login==false)
  {
    res.render("Signin");
  }
  else
  {
    res.render("Dasbboard",{name1: username1} );
  }
});


app.get('/RideBooking',async (req,res)=>
{
  console.log(Login);
  
  if(Login==false)
    {
      res.render("Signin");
    }
    else
    {
      res.render("RideBooking",{name1: username1});
    }
});


app.post('/RideBooking',async (req,res)=>
{
  let Name = req.body.name;
  let PickLocation = req.body.pickuplocation;
  let DropLocation = req.body.dropofflocation;
  let Time = req.body.time;
  let No_Passengers = req.body.passengers;
  let VehicleType = req.body.vehicletype;
  let Fare = req.body.fare;
  let Pay_Method = req.body.paymentmethod;
  

  const docRef = db.collection(RideDetails).doc();
    await docRef.set({
      Name: Name,
      PickLocation: PickLocation,
      DropLocation: DropLocation,
      Time: Time,
      No_Passengers: No_Passengers,
      VehicleType: VehicleType,
      Fare: Fare,
      Pay_Method: Pay_Method
    });
    console.log(`Document added with ID: ${docRef.id}`);
    
    RideArray = []

    // const snapshot = await db.collection(RideDetails).get();
    // snapshot.forEach(doc => {
    // //   console.log(`${doc.id} =>`, doc.data());
    // //   console.log(doc.data().quantity);
    // RideArray.push({
    //         docid: doc.id,
    //         Name: Name,
    //         PickLocation: doc.data().PickLocation,
    //         DropLocation: doc.data().DropLocation,
    //         Time: doc.data().Time,
    //         No_Passengers: doc.data().No_Passengers,
    //         VehicleType: doc.data().VehicleType,
    //         Fare: doc.data().Fare,
    //         Pay_Method: doc.data().Pay_Method
    //     });
    // });

    // console.log(RideArray);
    

  res.render("RidebookingConfrim",{
    Name: Name,
    PickLocation: PickLocation,
    DropLocation: DropLocation,
    Time: Time,
    No_Passengers: No_Passengers,
    VehicleType: VehicleType,
    Fare: Fare,
    Pay_Method: Pay_Method,
    name1: username1});
});


app.get('/RoomAccommodation',async (req,res)=>
{
  if(Login==false)
    {
      res.render("Signin");
    }
    else
    {
      res.render("RoomAcc",{name1: username1});
    }
});

app.post('/RoomAccommodation',async (req,res)=>
{

  let guestname = req.body.guestname;
  let numguests = req.body.numguests;
  let roomtype = req.body.roomtype;
  let checkindate = req.body.checkindate;
  let checkoutdate = req.body.checkoutdate;
  let price = req.body.price;
  let paymentmethod = req.body.paymentmethod;
  
  const docRef = db.collection(RoomDetails).doc();
    await docRef.set({
      guestname: guestname,
      numguests: numguests,
      roomtype: roomtype,
      checkindate: checkindate,
      checkoutdate: checkoutdate,
      price: price,
      paymentmethod: paymentmethod
    });
    console.log(`Document added with ID: ${docRef.id}`);


  res.render("RoomAccConfirm",{
    guestname: guestname,
      numguests: numguests,
      roomtype: roomtype,
      checkindate: checkindate,
      checkoutdate: checkoutdate,
      price: price,
      paymentmethod: paymentmethod,
      name1: username1
  });
});

app.get('/TableReservation',async (req,res)=>
{
  if(Login==false)
    {
      res.render("Signin");
    }
    else
    {
      res.render("TableReservation",{name1: username1});
    }
});

app.post('/TableReservation',async (req,res)=>
{

  let restaurant = req.body.restaurant;
  let reservationdate = req.body.reservationdate;
  let time = req.body.time;
  let guests = req.body.guests;
  let contact = req.body.contact;
  let specialrequests = req.body.specialrequests;
  let tablepreference = req.body.tablepreference;
  
  const docRef = db.collection(TableDetails).doc();
    await docRef.set({
      restaurant: restaurant,
      reservationdate: reservationdate,
      time: time,
      guests: guests,
      contact: contact,
      specialrequests: specialrequests,
      tablepreference: tablepreference
    });
    console.log(`Document added with ID: ${docRef.id}`);

  res.render("TableReservationConfirm",{
    restaurant: restaurant,
      reservationdate: reservationdate,
      time: time,
      guests: guests,
      contact: contact,
      specialrequests: specialrequests,
      tablepreference: tablepreference,
      name1: username1
  });
});


// app.get('/SS',async (req,res)=>
//   {
//         res.render("RidebookingConfrim");
//   });

app.get('/Signin',async (req,res)=>
{
      res.render("Signin");
});

app.post('/Signin',async (req,res)=>
{

  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  console.log(password);
  AccountArray = []
  await getItems(Account, AccountArray);

  for (let i = 0; i < AccountArray.length; i++) 
  {
    if(email==AccountArray[i].email)
    {
      if(password==AccountArray[i].password)
      {
        username1 = AccountArray[i].username;
        Login = true;
        res.render("Dasbboard",{name1: username1} );
      }
      else
      {
        res.render("Signin",{MSSG: "Incorrect Email or Password"});
      }
    }

  }


  console.log(AccountArray);
  

});

app.get('/Signup',async (req,res)=>
{
      res.render("Signup");
});

app.post('/Signup',async (req,res)=>
{
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  const docRef = db.collection(Account).doc();
    await docRef.set({
      username: username,
      email: email,
      password: password
    });
    console.log(`Document added with ID: ${docRef.id}`);


  res.render("Signin");
});


app.get('/about',async (req,res)=>
  {
        res.render("about",{name1: username1});
  });


  
app.get('/contact',async (req,res)=>
  {
        res.render("contact",{name1: username1});
  });







app.listen(port,'localhost',()=>{
    console.log(`Listening on port number : ${port}`);
});







