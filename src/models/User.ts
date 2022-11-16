class User {
  id: string;
  name: string;
  gender: 'male' | 'female';
  birthday: number;
  contacts: string[];

  constructor(
    id: string,
    name: string,
    gender: 'male' | 'female',
    birthday: number,
    contacts: string[]
  ) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.birthday = birthday;
    this.contacts = contacts;
  }
}

export default User;
