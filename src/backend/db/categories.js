import { v4 as uuid } from "uuid";
// import MensCategory from './Images/woman.webp'
// import WomensCategory from './Images/manCard.webp'
// import KidsCategory from './Images/accessoriesCard.webp'
/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */
import charger from "../../assets/categoriesAssets/charger.webp" 
import earphone from "../../assets/categoriesAssets/earphone.jpeg"
import phone from "../../assets/categoriesAssets/phone.jpeg"
export const categories = [
  {
    _id: uuid(),
    categoryName: "Mobile",
    description:"New Launches in 2023",
     img:phone, 
  },
  {
    _id: uuid(),
    categoryName: "Earphones",
    description:"New Launches in 2023",
    img: earphone,
  },
  {
    _id: uuid(),
    categoryName: "Accessories",
    description:"Chargers, Covers ",
    img: charger,
  },
];