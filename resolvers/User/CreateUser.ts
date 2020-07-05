import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { CreateUserInput } from "../../inputs/User/CreateUser";
import { prisma } from "../../prisma";
import { User } from "../../models/User";

@Resolver(User)
export class CreateUserResolver {
  @Query(() => [User])
  async getUsers() {
    await prisma.user.findMany();
  }

  @Mutation(() => Boolean)
  async createUser(@Arg("data") data: CreateUserInput) {
    await prisma.user.create({
      data,
    });
  }
}
