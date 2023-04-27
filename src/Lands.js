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
    "rice": "rice, चावल, तांदूळ",
    "maize": "maize, मक्का, मका",
    "chickpea": "chickpea, चना, हरभरा",
    "kidneybeans": "kidney beans, राजमा, राजमा",
    "pigeonpeas": "pigeon peas, अरहर दाल, तुअर दाळ",
    "mothbeans": "moth beans, मोठ बीन्स, मटकी",
    "mungbean": "mung bean, मूंग दाल, मुग",
    "blackgram": "black gram, काला चना, उडद दाल",
    "lentil": "lentil, मसूर दाल, मसूर",
    "pomegranate": "pomegranate, अनार, डाळिंब",
    "banana": "banana, केला, कच्च केळ",
    "mango": "mango, आम, आंबा",
    "grapes": "grapes, अंगूर, द्राक्ष",
    "watermelon": "watermelon, तरबूज, कलिंगड",
    "muskmelon": "muskmelon, खरबूजा, कवठे",
    "apple": "apple, सेब, सफरचंद",
    "orange": "orange, संतरा, संत्रा",
    "papaya": "papaya, पपीता, पपई",
    "coconut": "coconut, नारियल, नारळ",
    "cotton": "cotton, कपास, कापूस",
    "jute": "jute, जूट, जुट",
    "coffee": "coffee, कॉफ़ी, कॉफ़ी"
  };


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
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Recommended Crop</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>The recommended crop is: {FruitTranslations[crop]}</p>
            </div>
            <div className="modal-body row">
              <div className="col-sm-6">
                <img className="img-fluid" src={cropImageUrl[crop]} alt={crop} />
              </div>
              <div className="col-sm-6">
                <img className="img-fluid" src={FruitImageUrl[crop]} alt={crop} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
              <WeatherModal weatherData={weatherData}/>
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