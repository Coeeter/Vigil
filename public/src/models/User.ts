class User {
  id?: string | undefined;
  name: string;
  gender: 'male' | 'female';
  birthday: number;
  contacts: string[];

  constructor(
    id: string | undefined,
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
