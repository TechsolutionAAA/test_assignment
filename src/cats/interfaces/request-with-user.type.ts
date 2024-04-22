import {Request} from "express";
import {UserInterface} from "../../user/interfaces/user.interface";

export type RequestWithUser = Request & { user: UserInterface }