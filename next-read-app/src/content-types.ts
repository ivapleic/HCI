import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBookFields {
    Title: EntryFieldTypes.Text;
    CoverImage:EntryFieldTypes.AssetLink;
    Description: EntryFieldTypes.Text;
    Rating:EntryFieldTypes.Number;
    Author: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
    Language:EntryFieldTypes.Text;
    ISBN:EntryFieldTypes.Text;
    PublicationYear: EntryFieldTypes.Date;
    Genre: EntryFieldTypes.EntryLink<TypeGenreSkeleton>;
  }

  export interface TypeAuthorFields {
    FullName: EntryFieldTypes.Text;
    Bio: EntryFieldTypes.RichText;
    Nationality:EntryFieldTypes.Text;
    DateOfBirth: EntryFieldTypes.Date;
    ProfileImage: EntryFieldTypes.AssetLink;
    Books:EntryFieldTypes.EntryLink<TypeBookSkeleton>
  }

  export interface TypeGenreFields {
    Name: EntryFieldTypes.Text;
    Description: EntryFieldTypes.Text;
  }
  
  export interface TypeUserFields {
    FullName: EntryFieldTypes.Text;
    Email: EntryFieldTypes.Symbol;
    Password:EntryFieldTypes.Text;
    ProfilePicture: EntryFieldTypes.AssetLink;
    Bio: EntryFieldTypes.Text;
    FavouriteGenres:EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeGenreSkeleton>>;
    JoinedDate:EntryFieldTypes.Date;
    AccountStatus:EntryFieldTypes.Boolean;
  }

  export interface TypeListFields {
    Name: EntryFieldTypes.Text;
    Description?: EntryFieldTypes.Text;
    Genres: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeGenreSkeleton>>;
    Books: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBookSkeleton>>;
  }
  
  
  // Skeletons for Contentful types (basic structure without actual data)
export type TypeBookSkeleton = EntrySkeletonType<TypeBookFields, "book">;
export type TypeAuthorSkeleton = EntrySkeletonType<TypeAuthorFields, "author">;
export type TypeGenreSkeleton = EntrySkeletonType<TypeGenreFields, "genre">;
export type TypeUserSkeleton = EntrySkeletonType<TypeUserFields, "user">;
export type TypeListSkeleton = EntrySkeletonType<TypeListFields, "list">;

// Entry types to handle actual data from Contentful (using Entry)
export type TypeBook<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeBookSkeleton, Modifiers, Locales>;
export type TypeAuthor<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAuthorSkeleton, Modifiers, Locales>;
export type TypeGenre<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeGenreSkeleton, Modifiers, Locales>;
export type TypeUser<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeUserSkeleton, Modifiers, Locales>;
export type TypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeListSkeleton, Modifiers, Locales>;
