import { combineReducers } from "redux";
import User from "./User";
import Personal from "./Personal";
import Home from "./Home";
import Post from "./Post";
import PostById from "./PostById";
import DetailsPost from "./DetailsPost";
import Apartment from "./Apartment";
import CreatePayment from "./createPayment";
import MyPersonal from "./MyPersonal";
import PersonalOfMe from "./PersonalOfMe";
import Loadmore from "./Loadmore";

const appReducers = combineReducers({
  User,
  Personal,
  Home,
  Post,
  PostById,
  DetailsPost,
  Apartment,
  CreatePayment,
  MyPersonal,
  PersonalOfMe,
  Loadmore,
});

export default appReducers;
