import { createUserPayload } from "../../dataModels/userPayload";
import { getJsonArray} from "../../utils/TestDataReader";

export class UserDataProvider {
  private static users: createUserPayload[] = getJsonArray<createUserPayload>("api_multi_users");

  // Get all users
  static getAllUsers(): createUserPayload[] {
    return this.users;
  }

  // Get user by name
  static getUserByName(name: string): createUserPayload | undefined {
    return this.users.find(u => u.name === name);
  }

  // Get users by job role
  static getUsersByRole(job: string): createUserPayload[] {
    return this.users.filter(u => u.job === job);
  }

  // Get random user
  static getRandomUser(): createUserPayload {
    return this.users[Math.floor(Math.random() * this.users.length)];
  }
}