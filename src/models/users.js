import { api, Globals } from "./api";

export async function GetFriends(){
    const x = await api("users")
    return x;
};

export async function GetActivities(){
    const a = "activities/";
    const b = Globals.user.UserId;
    const c = (a + b);
    const x = await api(c);
    return x;
};

export async function AddActivity(data){
    const x = await api("activities", data)
    return x;
};

export async function RemoveActivity(data){
    const x = await api("activities/remove", data)
    return x;
};

export async function GetGoals(){
    const a = "goals/";
    const b = Globals.user.UserId;
    const c = (a + b);
    const x = await api(c);
    return x;
};

export async function AddGoal(data){
    const x = await api("goals", data)
    return x;
};

export async function MetGoal(data){
    const x = await api("goals/met", data)
    return x;
};

export async function RemoveGoal(data){
    const x = await api("goals/remove", data)
    return x;
};

export async function GetUpdates(){
    const a = "updates/";
    const b = Globals.user.UserId;
    const c = (a + b);
    const x = await api(c);
    return x;
};

export async function AddUpdate(data){
    const x = await api("updates", data)
    return x;
};

export async function Register(data){
    const x = await api("users", data)
    return x;
};

export async function Login(data){
    const x = await api("users/login", data)
    Globals.user = x.user;
    Globals.token = x.token;
    return x;
};

export async function oAuthLogin(token){
    const x = await api("users/facebookLogin", { token })
    Globals.user = x.user;
    Globals.token = x.token;
    Globals.oAuthUser = x.oAuthUser;
    return x;
};