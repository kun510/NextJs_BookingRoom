import { type } from "os";

export type Interface ={
    stt:number;
    id: number;
    day: string;
    reason: string;
    img1: string;
    img2: string;
    img3: string;
    times_report: number;
    status: string | null;
    unban: string | null;
    room: {
      id: number;
      description: string;
      img: string;
      numberOfStars: number;
      numberRoom: number;
      status: string;
      price: number;
      people: string;
      type: string;
      user: {
        id: number;
        phone: string;
        password: string;
        address: string | null;
        email: string | null;
        img: string;
        name: string;
        confirmation_status: string | null;
        token_device: string;
        role: {
          id: number;
          role: string;
        };
      };
      boardingHostel: {
        id: number;
        address: string;
        area: string;
        img: string;
        status: string;
        numberRoom: number;
        numberOfStars: number;
      };
      waterBill: number;
      electricBill: number;
    };
    user: {
      id: number;
      phone: string;
      password: string;
      address: string | null;
      email: string | null;
      img: string;
      name: string;
      confirmation_status: string | null;
      token_device: string;
      role: {
        id: number;
        role: string;
      };
    };
}
export type InterfaceUser = {
  id: number;
  name: string;
  phone: string;
  password: string;
  address: String; 
  email: String;
  img: String;
  token_device: String;
  role:{
    id: number,
    role: String;
  }
}
export type  RentData = {
  id: number;
  room: {
    id: number;
    description: string;
    img: string;
    numberOfStars: number;
    numberRoom: number;
    status: string;
    price: number;
    people: string;
    type: string;
    user: {
      id: number;
      phone: string;
      password: string;
      address: string;
      email: string;
      img: string;
      name: string;
      confirmation_status: string;
      token_device: string;
      role: {
        id: number;
        role: string;
      };
    };
    boardingHostel: {
      id: number;
      address: string;
      area: string;
      img: string;
      status: string;
      numberRoom: number;
      numberOfStars: number;
      user: {
        id: number;
        phone: string;
        password: string;
        address: string;
        email: string;
        img: string;
        name: string;
        confirmation_status: string;
        token_device: string;
        role: {
          id: number;
          role: string;
        };
      };
    };
    electricBill: number;
    waterBill: number;
  };
  user: {
    id: number;
    phone: string;
    password: string;
    address: string;
    email: string;
    img: string;
    name: string;
    confirmation_status: string | null;
    token_device: string;
    role: {
      id: number;
      role: string;
    };
  };
  status: string;
  peopleInRoom: number;
}
export type  UserData = {
  id: number;
    phone: string;
    password: string;
    address: string;
    email: string;
    img: string;
    name: string;
    confirmation_status: string | null;
    token_device: string;
    role: {
      id: number;
      role: string;
    };
}

export type  RoomData = {
    id: number;
    description: string;
    img: string;
    numberOfStars: number;
    numberRoom: number;
    status: string;
    price: number;
    people: string;
    type: string;
    user: {
      id: number;
      phone: string;
      password: string;
      address: string;
      email: string;
      img: string;
      name: string;
      confirmation_status: string;
      token_device: string;
      role: {
        id: number;
        role: string;
      };
    };
    boardingHostel: {
      id: number;
      address: string;
      area: string;
      img: string;
      status: string;
      numberRoom: number;
      numberOfStars: number;
      user: {
        id: number;
        phone: string;
        password: string;
        address: string;
        email: string;
        img: string;
        name: string;
        confirmation_status: string;
        token_device: string;
        role: {
          id: number;
          role: string;
        };
      };
    };
    electricBill: number;
    waterBill: number;
};

export type BoardingData = {
  boardingHost: {
    id: number;
    address: string;
    area: string;
    img: string;
    status: string;
    numberRoom: number;
    numberOfStars: number;
    user: {
      id: number;
      phone: string;
      password: string;
      address: string;
      email: string;
      img: string;
      name: string;
      confirmation_status: string;
      token_device: string;
      role: {
        id: number;
        role: string;
      };
    };
  };
  count: number;
};

export type  Notification = {
  id: number;
  user_id_sender: {
    id: number;
    phone: string;
    password: string;
    address: string;
    email: string;
    img: string;
    name: string;
    confirmation_status: string | null;
    token_device: string | null;
    role: {
      id: number;
      role: string;
    };
  };
  content: string;
  time: string;
  user_id_receiver: {
    id: number;
    phone: string;
    password: string;
    address: string;
    email: string;
    img: string;
    name: string;
    confirmation_status: string | null;
    token_device: string | null;
    role: {
      id: number;
      role: string;
    };
  };
}