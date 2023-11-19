import { array, boolean, lazy, number, object, string } from "yup";

import { Position, SelectiveLogic } from "../models/Entry";

export const configSchema = object({
  titleType: string()
    .oneOf(["key", "comment"])
    .default(() => "key")
    .defined()
    .required(),
  searchQuery: string()
    .default(() => "")
    .defined()
    .required(),
});

export const entrySchema = object({
  uid: number().defined().required(),

  // activation keys
  key: array()
    .of(string().defined().required())
    .default(() => [])
    .required(),
  keysecondary: array()
    .of(string().defined().required())
    .default(() => [])
    .required(),

  // user content
  content: string().default(() => ""),
  comment: string().default(() => ""),

  // settings
  constant: boolean()
    .default(() => false)
    .defined()
    .required(),
  selective: boolean()
    .default(() => true)
    .defined()
    .required(),
  selectiveLogic: number()
    .oneOf([SelectiveLogic.AND, SelectiveLogic.NOT])
    .default(() => SelectiveLogic.AND)
    .defined()
    .required(),
  addMemo: boolean()
    .default(() => true)
    .defined()
    .required(),
  order: number()
    .default(() => 100)
    .required(),
  position: number()
    .oneOf([
      Position.AFTER_AN,
      Position.AFTER_DEFS,
      Position.BEFORE_AN,
      Position.BEFORE_DEFS,
    ])
    .default(() => Position.BEFORE_DEFS)
    .defined()
    .required(),
  disable: boolean()
    .default(() => false)
    .defined()
    .required(),
  excludeRecursion: boolean()
    .default(() => false)
    .defined()
    .required(),
  probability: number()
    .default(() => 100)
    .min(0)
    .max(100)
    .defined()
    .required(),
  useProbability: boolean()
    .default(() => true)
    .defined()
    .required(),
});

// `yup` doesn't have a mapping schema type. This is a workaround utilising lazy validation. Lacks uniqueness checks.
export const lorebookSchema = object({
  entries: lazy((details) =>
    object(
      Object.fromEntries(Object.keys(details).map((key) => [key, entrySchema])),
    ),
  ),
  filename: string(),
});
