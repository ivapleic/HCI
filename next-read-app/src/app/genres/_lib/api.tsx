import { Asset } from "contentful-management";

export type Genre = {
    Name: string;
  Description: string;
};

export type List= {
    Name: string;
  Description: string;
  Genres:Genre[],
  Books:Book[],
};

export type Book = {
    Title:string,
    CoverImage:Asset,
    Description:string,
    Rating:number,
    Author:Author[],
    Language:string,
    ISBN:string,
    PublicationYear:Date,
    Genre:Genre[]
}

export type Author =  {
    FullName:string,
    Bio:string,
    ProfileImage:Asset,
    Nationality:string,
    Books:Book[],
    DateOfBirth:Date

}