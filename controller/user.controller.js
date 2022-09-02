// get random values 
function getRandom(input) {
    return input[Math.floor((Math.random() * input.length))];
}

// random select gender 
const randomGender = () =>{
    const gender = ['male', 'female'];
    return getRandom(gender);
}

// random name select 
const randomName = () =>{
    if (randomGender() === 'male') {
        return randomMaleName();
    }
    else{
        return randomFemaleName();
    }
}

// random male and female nam generator 
const randomMaleName = () =>{
    const maleName = ['Liam','Noah','Oliver','Elijah','James','William','Benjamin','Lucas','Henry','Theodore','Jack','Levi','Alexander','Jackson','Mated','Daniel','Michael','Mason','Sebastian','Ethan'];
    return getRandom(maleName);
}
const randomFemaleName = () =>{
    const femaleName = ['Olivia','Emma','Charlotte','Amelia','Ava','Sophia','Isabella','Mia','Evelyn','Harper','Luna','Camilla','Dianna','Elizabeth','Eleanor','Ella','Abigail','Sofia','Avery','Scarlet'];
    return getRandom(femaleName);
}

// random user id generator 
const randomID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

//   random contact generator 
const randomContact = () =>{
    const operators = ['016', '015','017','019','018','014'];
    const operator = getRandom(operators);
    return operator + Math.floor(Math.random() * 1000000000);
}

// random address generator 
// like ('34343,F street,Riyadh,East State,99625')
const randomAddress = () =>{
    const streetNumbers = ['25489', '87459', '35478', '15975', '95125', '78965','23435','34343','67763'];
    const streetNames = ['A street', 'B street', 'C street', 'D street', 'E street', 'F street'];
    const cityNames = ['Riyadh', 'Dammam', 'Jedda', 'Tabouk', 'Makka', 'Maddena', 'Haiel','Dhaka','Turkish'];
    const stateNames = ['Qassem State', 'North State', 'East State', 'South State', 'West State'];
    const zipCodes = ['28889', '96459', '35748', '15005', '99625', '71465','24579','24943','27915','57943'];

    return `${getRandom(streetNumbers)}, ${getRandom(streetNames)}, ${getRandom(cityNames)}, ${getRandom(stateNames)}, ${getRandom(zipCodes)}`;
}

// random photo url with size

// https://source.unsplash.com/user/c_v_r/1600x900.jpg
// https://source.unsplash.com/user/c_v_r/1600x900.webp
// https://picsum.photos/200/300
// https://picsum.photos/100.jpg
// https://picsum.photos/100.webp

const randomNumber = () =>{
    return Math.floor(Math.random() * 10)+'00';
}
const randomPhotoUrl = () =>{
    const urls = ['https://picsum.photos','https://source.unsplash.com'];
    const formate = ['.jpg','.png', '.webp', ''];
    const url = getRandom(urls);
    const photoRange = randomNumber();
    if (url === 'https://picsum.photos') {
        return `https://picsum.photos/${photoRange}/${photoRange}${getRandom(formate)}`;
    }
    else{
        return `https://source.unsplash.com/user/c_v_r/${photoRange}x${photoRange}${getRandom(formate)}`;
    }
}




module.exports.getRandomUser = (req, res) => {
    res.status(200).send({
        success: true,
        messages: "Success",
        data: {
            "Id": randomID(),
            "gender": randomGender(),
            "name": randomName(),
            "contact": randomContact(),
            "address": randomAddress(),
            "photoUrl": randomPhotoUrl()
        }
    })
}