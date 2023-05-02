import React, { useEffect, useState, useRef } from 'react'
import './Land.css'
import AddLandModal from './AddLandModal';
import EditLandModal from './EditLandModal';
import WeatherModal from './WeatherModal';

// https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=e1ad429ecb5a6a237491211d9c781e3f
// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=e1ad429ecb5a6a237491211d9c781e3f
// https://api.openweathermap.org/data/2.5/forecast?q=Mumbai&appid=09cfb2b80383bb47670ff061a60c501f

function Lands() {
  const host = "http://localhost:5000"
  const [lands, setlands] = useState(null);
  const [crop, setCrop] = useState("");
  const [id, setID] = useState(null);
  const [deleteID, setDeleteID] = useState(null);
  const apiKey = "09cfb2b80383bb47670ff061a60c501f";
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getLands();
  }, [lands])

  const cropImageUrl = {
    "rice": "https://cdn.britannica.com/99/150499-050-ECBF2AED/Rice-cultivation-path-flooded-rice-paddy-Philippines.jpg?w=300&h=169&c=crop",
    "maize": "https://cdn.britannica.com/36/167236-050-BF90337E/Ears-corn.jpg",
    "chickpea": "https://media.istockphoto.com/id/638538708/photo/woman-showing-chickpeas-in-close-up.jpg?s=1024x1024&w=is&k=20&c=1ZqaSwh3WrgyP3YYiQxY-aeN_1e0T-70YW4Xict8_g0=",
    "kidneybeans": "https://www.apnikheti.com/upload/crops/489idea99Red-kidney-beans-2.jpg",
    "pigeonpeas": "https://www.apnikheti.com/upload/crops/2367idea99pigeon.jpg",
    "mothbeans": "https://syncwithnature.in/wp-content/uploads/2020/10/dew-gram-beans1.png",
    "mungbean": "https://thumbs.dreamstime.com/b/mung-bean-plant-close-up-fruits-scientific-name-vigna-radiata-195861069.jpg",
    "blackgram": "https://www.asiafarming.com/wp-content/uploads/2018/02/Black-Gram-Growing-and-Cultivation-Practices.-e1523079398684.jpg",
    "lentil": "https://www.agrifarming.in/wp-content/uploads/2019/09/pByRhQ1X.jpg",
    "pomegranate": "https://plantix.net/en/library/assets/custom/crop-images/pomegranate.jpeg",
    "banana": "https://www.shutterstock.com/image-photo/organic-banana-field-fresh-bananas-260nw-1614877438.jpg",
    "mango": "https://www.digitrac.in/pub/media/magefan_blog/Mango_crop.min.jpg",
    "grapes": "https://www.asiafarming.com/wp-content/uploads/2016/02/Grape-Garden.jpg",
    "watermelon": "https://www.agrifarming.in/wp-content/uploads/2015/02/E7700936-Watermelon_field-SPL.jpg",
    "muskmelon": "https://www.agrifarming.in/wp-content/uploads/2015/05/Growing-Cantaloupe..jpg",
    "apple": "https://www.thestatesman.com/wp-content/uploads/2022/09/The-Apple-cultivation-story-is-full-of-challenges-in-India-1.jpg",
    "orange": "https://www.agrifarming.in/wp-content/uploads/2015/03/oranges-1117628_960_720.jpg",
    "papaya": "https://www.agrifarming.in/wp-content/uploads/2015/03/Papaya-Farming.jpg",
    "coconut": "https://greenorchid.co.in/wp-content/uploads/2021/01/coconut-tree.jpg",
    "cotton": "https://kj1bcdn.b-cdn.net/media/51223/cotton-farming.jpg",
    "jute": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Jute_Field_Bangladesh_%287749587518%29.jpg",
    "coffee": "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?cs=srgb&dl=pexels-igor-haritanovich-1695052.jpg&fm=jpg",
  };

  const FruitImageUrl = {
    "rice": "https://recipes.timesofindia.com/thumb/54504752.cms?width=1200&height=900",
    "maize": "https://assets.thehansindia.com/h-upload/2021/11/25/1123455-maize.webp",
    "chickpea": "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/chickpea-curry-recipe.jpg",
    "kidneybeans": "https://www.sharmispassions.com/wp-content/uploads/2013/04/RajmaMasala6-500x500.jpg",
    "pigeonpeas": "https://www.tropicalpermaculture.com/images/pigeon-pea6.jpg",
    "mothbeans": "https://www.angur.com/wp-content/uploads/2021/10/Moth-Dal-1-scaled.jpg",
    "mungbean": "https://media.istockphoto.com/id/481275428/photo/mung-beans-poured-from-the-sack.jpg?s=612x612&w=0&k=20&c=0fhXUTSFNAOelDisralouhP__sWcJFCO8l-TI2j_cjc=",
    "blackgram": "https://farmerspride.in/wp-content/uploads/2022/08/Black-Gram-Whole-with-pack.jpg",
    "lentil": "https://upload.wikimedia.org/wikipedia/commons/f/f5/3_types_of_lentil.png",
    "pomegranate": "https://images.healthshots.com/healthshots/en/uploads/2021/09/27184641/pomegranate-1600x900.jpg",
    "banana": "https://www.daysoftheyear.com/wp-content/uploads/banana-day1-scaled.jpg",
    "mango": "https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322096/mangoes-chopped-and-fresh.jpg",
    "grapes": "https://scitechdaily.com/images/Grapes-Wood.jpg",
    "watermelon": "https://www.gardeningknowhow.com/wp-content/uploads/2021/05/whole-and-slices-watermelon.jpg",
    "muskmelon": "https://4.imimg.com/data4/WM/QT/MY-24421102/fresh-musk-melon-500x500.jpg",
    "apple": "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-1000x1000.jpg",
    "orange": "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg",
    "papaya": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2022/12/20/whole-and-cut-papaya-with-seeds-on-white-background.jpg.rend.hgtvcom.616.440.suffix/1671549024394.jpeg",
    "coconut": "https://static.toiimg.com/thumb/msid-82063460,width-1280,resizemode-4/82063460.jpg",
    "cotton": "https://5.imimg.com/data5/MF/KG/DB/SELLER-6228751/plain-cotton-fabric-500x500.jpg",
    "jute": "https://4.imimg.com/data4/OR/KI/MY-1432329/jute-cloth-500x500.jpg",
    "coffee": "https://static.toiimg.com/photo/89078867.cms",
  };

  const FruitTranslations = {
    "rice": "Rice, चावल, तांदूळ, ચોખો, ধান, அரிசி, బియ్యం, ಅಕ್ಕಿ, പച്ചരി",
    "maize": "Maize, मक्का, मका, મકાઈ, ভুট্টা, மக்காச்சோளம், మక్కజొన్న, ಮಕ್ಕ",
    "chickpea": "Chickpea, चना, हरभरा, ચણા, চনা, கொண்டைக் கடலை, శనగలు, ಕಡಲೆ",
    "kidneybeans": "Kidney beans, राजमा, राजमा, રાજમા, রাজমা, தட்டை, రాజ్ మా అవరెకడు, ರಾಜಮಾ",
    "pigeonpeas": "Pigeon peas, अरहर दाल, तुअर दाळ, તુવેર, তুয়ার ডাল, துவரை, తూర దాల్, ತೂರ್ ದಾಲ್",
    "mothbeans": "Moth beans, मोठ बीन्स, मटकी, મોઠ, মঠ ডাল, மோதாம், మొథర్ దాల్, ಹೆಸರು ಕಾಳು",
    "mungbean": "Mung bean, मूंग दाल, मुग, મગ, মুগ ডাল, பாசிப்பயறு, పెసర పప్పు, ಹೆಸರು ಕಾಳು",
    "blackgram": "Black gram, काला चना, उडद दाल, ચોળા, কালো চলকপি ডাল, உளுந்து, మినుగుపప్పు, ಉದ್ದಿನ ಬೇಳೆ",
    "lentil": "Lentil, मसूर दाल, मसूर, মসুর ডাল, பருப்பு, పప్పు",
    "pomegranate": "Pomegranate, अनार, डाळिंब, ডালিম, மாதுளம், దానిమ్మ",
    "banana": "Banana, केला, कच्च केळ, কলা, வாழைப்பழம், ఆరటి",
    "mango": "Mango, आम, आंबा, আম, மாம்பழம், మామిడి",
    "grapes": "Grapes, अंगूर, द्राक्ष, আঙ্গুর, திராட்சை, ద్రాక్ష",
    "watermelon": "Watermelon, तरबूज, कलिंगड, তরমুজ, தர்பூசணி, పుచ్చకాయ",
    "muskmelon": "Muskmelon, खरबूजा, कवठे, খরমুজ, முலாம்பழம், ఖర్బూజ",
    "apple": "Apple, सेब, सफरचंद, আপেল, ஆப்பிள், ఆపిల్",
    "orange": "Orange, संतरा, संत्रा, কমলা, ஆரஞ்சு, నారింజ",
    "papaya": "Papaya, पपीता, पपई, পেঁপে, பப்பாளி, బొప్పాయ",
    "coconut": "Coconut, नारियल, नारळ, নারিকেল, தேங்காய், కొబ్బరినెల్లు",
    "cotton": "Cotton, कपास, कापूस, সুত, பருத்தி, పంచ్తాన్తులు",
    "jute": "Jute, जूट, जुट, જુટી, জুট, சணல், జూట్, ಜೂಟ್, ജൂട്ട്",
    "coffee": "Coffee, कॉफ़ी, कॉफ़ी, કોફી, কফি, காபி, కాఫీ, ಕಾಫಿ, കോഫി"
};


  const cropInfo = {
    "rice": "\n\nRice is a cereal grain that is grown in many parts of the world. It is a staple food for many cultures and is one of the most widely consumed grains in the world. Rice is typically grown in tropical and subtropical regions, such as South and Southeast Asia, Africa, and Latin America. Rice is usually planted in the spring and harvested in the fall. The best fertilizers for rice are nitrogen, phosphorus, and potassium. Pesticides should be used sparingly and only when necessary. Best farming practices for rice include crop rotation, soil conservation, and water management.",

    "maize": "\n\nMaize is a cereal crop that is grown in many parts of the world. It is a warm season crop, and is best grown in areas with long, hot summers. It is usually planted in late spring or early summer and harvested in late summer or early fall. Maize is a heavy feeder and requires plenty of nitrogen, phosphorus, and potassium for optimal growth. It is also susceptible to pests and diseases, so it is important to use the right fertilizers and pesticides to keep the crop healthy. Good farming practices for maize include crop rotation, proper irrigation, and timely weeding.",

    "chickpea": "\n\nChickpea is a cool-season crop that is grown in many parts of the world, including India, Pakistan, Turkey, Ethiopia, Mexico, and the United States. It is typically planted in the spring and harvested in the late summer or early fall. Chickpea is a legume crop and is best grown in well-drained, loamy soils with a pH of 6.0-7.5. It is tolerant of drought and can be grown in areas with low rainfall. To ensure a good yield, it is important to use the right fertilizers and pesticides. Organic fertilizers such as compost and manure are recommended for chickpea production. Additionally, it is important to practice crop rotation and use cover crops to reduce soil erosion and improve soil fertility.",

    "kidneybeans": "\n\nKidney beans are an annual crop that grows best in warm climates with well-drained soil. They are usually planted in the spring after the last frost and harvested in the late summer or early fall. Kidney beans require a lot of nitrogen, so it is important to use a fertilizer that is high in nitrogen. Additionally, it is important to rotate crops and practice crop rotation to prevent soil depletion. To protect the crop from pests, it is important to use natural pest control methods such as companion planting and using beneficial insects.",

    "pigeonpeas": "\n\nPigeonpeas (Cajanus cajan) is a warm-season annual legume crop grown for its edible seeds. It is native to India and is widely grown in tropical and subtropical regions of the world. It is a drought-tolerant crop and can be grown in areas with low rainfall. Pigeonpeas are usually grown in the summer season, from April to October. The best fertilizers for pigeonpeas are nitrogen, phosphorus, and potassium. Pigeonpeas are also susceptible to pests and diseases, so it is important to use appropriate pesticides and fungicides to protect the crop. Good farming practices for pigeonpeas include crop rotation, proper irrigation, and timely weeding.",

    "mothbeans": "\n\nMothbeans are a type of legume that is native to the Mediterranean region. They are a warm-season crop, and are usually planted in the spring. Mothbeans prefer well-drained, sandy soils with a pH of 6.5-7.5. They are drought tolerant and can tolerate some salinity. The best fertilizers for mothbeans are nitrogen-based fertilizers, such as ammonium sulfate or urea. Pesticides should be used sparingly, as mothbeans are relatively pest-resistant. Best farming practices for mothbeans include crop rotation, proper irrigation, and timely harvesting.",

    "mungbean": "\n\nMungbean is an annual legume crop that is grown in tropical and subtropical regions. It is most commonly grown in India, China, and Southeast Asia. It is typically planted in the spring and harvested in the late summer or early fall. The best fertilizers for mungbean are nitrogen, phosphorus, and potassium. Pesticides should be used sparingly and only when necessary. Good farming practices for mungbean include crop rotation, proper irrigation, and timely weeding.",

    "blackgram": "\n\nBlackgram (Vigna mungo) is an annual legume crop grown in tropical and subtropical regions of the world. It is mainly grown in India, Bangladesh, Pakistan, Nepal, Myanmar, Thailand, and Vietnam. It is a short-duration crop, usually maturing in about 90-120 days.\n\nBlackgram is best grown in well-drained, loamy soils with a pH of 6.0-7.5. It is a warm-season crop and is usually planted in late spring or early summer.\n\nThe best fertilizers for blackgram are nitrogen, phosphorus, and potassium. Organic fertilizers such as compost, manure, and green manure can also be used. Pesticides such as neem oil, pyrethrum, and spinosad can be used to control pests.\n\nThe best farming practices for blackgram include crop rotation, timely sowing, proper irrigation, and timely weeding. Mulching can also help conserve soil moisture and reduce weed growth.",

    "lentil": "\n\nLentils are an annual legume crop that is grown in temperate and subtropical regions around the world. They are usually planted in the spring and harvested in the late summer or early fall. Lentils prefer well-drained, fertile soils with a pH of 6.0-7.5. They are best grown in areas with full sun and moderate temperatures. To ensure a good crop, it is important to use the right fertilizers and pesticides. Organic fertilizers such as compost, manure, and bone meal are best for lentils. For pest control, use natural methods such as crop rotation, hand-picking, and beneficial insects. Good farming practices such as proper irrigation, timely weeding, and crop rotation can also help to ensure a good crop.",

    "pomegranate": "\n\nPomegranate is a subtropical and tropical fruit crop that is grown in warm climates. It is best suited to areas with hot summers and mild winters, such as the Mediterranean, Middle East, and parts of the United States. It is typically harvested in late summer and early fall. The best fertilizers for pomegranate are those that are high in nitrogen, phosphorus, and potassium. Pesticides should be used sparingly and only when necessary. Good farming practices for pomegranate include proper irrigation, pruning, and mulching.",

    "banana": "\n\nBananas are a tropical fruit crop that grows best in warm, humid climates with plenty of rainfall. They are typically grown in tropical and subtropical regions, such as Central and South America, Africa, and Southeast Asia. Bananas are a perennial crop, meaning they can be harvested year-round. The best fertilizers for banana plants are high in nitrogen, potassium, and phosphorus. Pesticides should be used sparingly, as bananas are sensitive to many chemicals. Good farming practices for bananas include proper soil preparation, adequate irrigation, and regular pruning.",

    "mango": "\n\nMango is a tropical fruit tree that is native to South Asia and is widely cultivated in many tropical and subtropical regions. It is a long-lived, evergreen tree that can reach heights of up to 100 feet. Mango trees prefer warm, humid climates and thrive in areas with temperatures between 65 and 100 degrees Fahrenheit. They require full sun and well-drained soil. Mango trees are usually planted in the spring and require regular watering and fertilizing. The best fertilizers for mango trees are those that are high in nitrogen, phosphorus, and potassium. Pesticides should be used sparingly and only when necessary. Good farming practices for mango trees include pruning, mulching, and pest control.",

    "grapes": "\n\nGrapes are a type of fruit that is grown in temperate climates around the world. They are typically grown in regions with warm summers and mild winters, such as the Mediterranean, California, and South Africa. Grapes are usually harvested in the late summer or early fall. The best fertilizers for grapes are those that are high in nitrogen, phosphorus, and potassium. Pesticides should be used sparingly and only when necessary. Good farming practices for grapes include pruning, training, and trellising the vines, as well as controlling weeds and pests.",

    "watermelon": "\n\nWatermelon is a warm-season crop that grows best in full sun and well-drained soil. It is best planted in the spring after the last frost and harvested in late summer. Watermelons require a lot of water and nutrients, so it is important to fertilize the soil with a balanced fertilizer before planting. To prevent disease and pests, use a fungicide and insecticide. Good farming practices for watermelon include proper spacing of plants, adequate water, and mulching to conserve moisture.",

    "muskmelon": "\n\nMuskmelon is a warm-season crop that is grown in many parts of the world. It is best grown in areas with full sun and well-drained soil. It is usually planted in late spring or early summer and harvested in late summer or early fall. The best fertilizers for muskmelon are those that are high in nitrogen and potassium, such as a 10-10-10 fertilizer. Pesticides should be used sparingly and only when necessary. Good farming practices for muskmelon include proper irrigation, mulching, and crop rotation.",

    "apple": "\n\nApple is a deciduous tree that is grown in temperate climates. It is best suited to grow in areas with cold winters and warm summers. It is best grown in well-drained, slightly acidic soil. Apples need full sun and regular watering. The best fertilizers for apple trees are those that are high in nitrogen, phosphorus, and potassium. Pesticides should be used sparingly and only when necessary. Good farming practices for apple trees include pruning, thinning, and mulching.",

    "orange": "\n\nOrange is a citrus fruit that is grown in warm climates, such as in Florida, California, and Texas in the United States. It is typically harvested in the winter months, from November to March. The best fertilizers for oranges are those that are high in nitrogen, phosphorus, and potassium. Pesticides should be used sparingly and only when necessary, as oranges are sensitive to many chemicals. Good farming practices for oranges include proper irrigation, pruning, and thinning of the fruit. Additionally, it is important to monitor the soil for nutrient deficiencies and to keep the trees healthy.",

    "papaya": "\n\nPapaya is a tropical fruit crop that is grown in warm climates, such as in the Caribbean, Central America, South America, and Southeast Asia. It is typically grown in the summer months, and requires plenty of sunlight and water. Papaya plants are sensitive to cold temperatures, so they should be protected from frost. The best fertilizers for papaya plants are high in nitrogen, phosphorus, and potassium. Commonly used pesticides for papaya include insecticides, fungicides, and herbicides. Good farming practices for papaya include proper soil preparation, adequate irrigation, and regular pruning.",

    "coconut": "\n\nCoconut is a tropical crop that is grown in tropical and subtropical regions around the world. It is a perennial crop that is harvested year-round. The best fertilizers for coconut trees are those that are high in nitrogen, phosphorus, and potassium. Pesticides should be used sparingly and only when necessary. Good farming practices for coconut trees include regular pruning, mulching, and irrigation. Additionally, it is important to keep the soil well-drained and free of weeds.",

    "cotton": "\n\nCotton is a warm-season crop that is grown in many parts of the world. It is typically planted in the spring and harvested in the late summer or early fall. Cotton prefers well-drained, sandy loam soils with a pH of 6.0-7.0. It is important to use the right fertilizers and pesticides to ensure a healthy crop. Fertilizers should be applied in the spring and again in the summer. Pesticides should be used to control weeds, insects, and diseases. Best farming practices for cotton include crop rotation, proper irrigation, and timely harvesting.",

    "jute": "\n\nJute is a type of fiber crop that is grown in tropical and subtropical regions of the world. It is mainly grown in India, Bangladesh, China, Thailand, and Myanmar. Jute is a warm-season crop and is usually planted in late spring or early summer. It requires a warm, humid climate and plenty of water for optimal growth. The best fertilizers for jute are nitrogen, phosphorus, and potassium. Pesticides such as carbofuran, endosulfan, and chlorpyrifos can be used to control pests. Good farming practices for jute include crop rotation, proper irrigation, and timely harvesting.",

    "coffee": "\n\nCoffee is a tropical crop that is grown in the equatorial regions of the world, including Central and South America, Africa, and Southeast Asia. It is typically grown in the shade of other trees and requires a warm, humid climate with plenty of rainfall. Coffee is usually harvested in the late summer and early fall. The best fertilizers for coffee plants are those that are high in nitrogen, phosphorus, and potassium. Pesticides should be used sparingly and only when absolutely necessary. Good farming practices for coffee include pruning, weeding, and mulching to keep the soil moist and fertile."
  }


  const ref = useRef(null);
  const CropRef = useRef(null);
  const editRef = useRef(null);
  const deleteRef = useRef(null);
  const weatherRef = useRef(null);

  const fetchWeatherData = async (citys, setWeatherData) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${citys}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    setWeatherData(data);
    // console.log("Printing weather data: ", data);
  };

  const handleDelete = async () => {
    const response = await fetch(`${host}/api/land/deleteland/${deleteID}`, {
      method: "DELETE",
      headers: {
        "Content-type": "applications/json",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-token": localStorage.getItem('token')
      }
    });
    console.log(response.json());
  }

  const getRecommendation = async (land) => {

    const response = await fetch(`http://127.0.0.1:8000/predict`, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(land)
    })

    const json = await response.json();
    console.log(json);
    setCrop(json.crop);
    CropRef.current.click();
  }

  const getLands = async () => {
    const response = await fetch(`${host}/api/land/fetchalllands`, {
      method: "GET",
      headers: {
        "Content-type": "applications/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setlands(json);
  }

  const handleAddLandClick = () => {
    console.log(ref.current)
    ref.current.click()
  };

  const handleEditClick = (currentLand) => {
    setID(currentLand._id);
    editRef.current.click();
  }

  const handleDeleteClick = (currentLand) => {
    setDeleteID(currentLand._id);
    deleteRef.current.click();
  }

  const handleWeatherClick = async (currentLand) => {
    await fetchWeatherData(currentLand.city, setWeatherData);
    weatherRef.current.click();
  }

  return (
    <div>
      {/* Crop recommendation modal  */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={CropRef}>
      </button>
      <div className="modal fade modal-xl" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Recommended Crop</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h3>{FruitTranslations[crop]}</h3>
            </div>
            <div class="modal-body row">
              <div class="col-sm-6">
                <img class="img-fluid h-100 w-100" src={cropImageUrl[crop]} alt={crop} />
              </div>
              <div class="col-sm-6">
                <img class="img-fluid h-100 w-100" src={FruitImageUrl[crop]} alt={crop} />
              </div>
            </div>
            <div class="modal-body">
              <h3>Here's some information about {crop}</h3>
              <p>{cropInfo[crop]}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>

      {/* Delete modal  */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal" ref={deleteRef}>
      </button>
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete the land?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              If you click the delete button, all the data for the respective land will be lost.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(deleteID)}>Delete</button>
            </div>
          </div>
        </div>
      </div>


      <h2>
        Your Farm lands
        <i id="add-land" className="fa-solid fa-square-plus" style={{ cursor: "pointer" }} onClick={() => handleAddLandClick()}></i>
      </h2>

      {/* Add Land modal  */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1" ref={ref}>
      </button>
      <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Land</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <AddLandModal />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Land modal */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2" ref={editRef}>
      </button>
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Land</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <EditLandModal id={id} />
            </div>
          </div>
        </div>
      </div>

      {/* Weather Modal */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#weatherModal" ref={weatherRef}>
      </button>
      <div className="modal fade modal-xl" id="weatherModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Live weather</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body overflow-auto">
              <WeatherModal weatherData={weatherData} />
            </div>
          </div>
        </div>
      </div>


      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">City<i className="fa-solid fa-raindrops"></i></th>
            <th scope="col">N</th>
            <th scope="col">P</th>
            <th scope="col">K</th>
            <th scope="col">Temperature</th>
            <th scope="col">Relative Humidity</th>
            <th scope="col">pH</th>
            <th scope="col">Rainfall</th>
            <th scope="col">Recommendation</th>
            <th scope="col">Weather</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {lands &&
            lands.map((land) => {
              return (
                <tr key={land._id}>
                  <td>{land.city}</td>
                  <td>{land.nitrogen === -1 ? "NA" : land.nitrogen}</td>
                  <td>{land.phosphorous === -1 ? "NA" : land.phosphorous}</td>
                  <td>{land.potassium === -1 ? "NA" : land.potassium}</td>
                  <td>{land.avg_temperature === -1 ? "NA" : land.avg_temperature + "°C"}</td>
                  <td>{land.avg_humidity === -1 ? "NA" : land.avg_humidity + "%"}</td>
                  <td>{land.ph === -1 ? "NA" : land.ph}</td>
                  <td>{land.rainfall === -1 ? "NA" : land.rainfall + "mm"}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => getRecommendation(land)}
                      disabled={
                        land.nitrogen === -1 ||
                        land.phosphorous === -1 ||
                        land.potassium === -1 ||
                        land.avg_temperature === -1 ||
                        land.avg_humidity === -1 ||
                        land.ph === -1 ||
                        land.rainfall === -1
                      }
                    >
                      Get Crop recommendation <i className="fa-solid fa-plant-wilt"></i>
                    </button>
                  </td>
                  <td><button className='btn btn-primary' onClick={() => handleWeatherClick(land)}>Get Live Weather<i className="fa-solid fa-cloud"></i></button></td>
                  <td>
                    <i className="fa-solid fa-pen text-primary" onClick={() => handleEditClick(land)}></i>
                  </td>
                  <td>
                    <i className="fa-solid fa-trash text-danger" onClick={() => handleDeleteClick(land)}></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

    </div>
  )
}

export default Lands;