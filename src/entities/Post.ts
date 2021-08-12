import { IsEmail, Length } from "class-validator";
import bcrypt from 'bcrypt'
import { Entity as TOEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from 'class-transformer'

import Entity from './Entity'
import User from "./User";
import { makeId, slugify } from "../utils/helpers";
import Sub from "./Sub";
@TOEntity("posts")
export default class Post extends Entity {
  constructor(user: Partial<Post>) {
    super()
    Object.assign(this, user)
  }

  @Index()
  @Column()
  identifier: string

  @Index()
  @Column()
  title: string

  @Column()
  slug: string

  @Column({ nullable: true, type: 'text' })
  body: string


  @Column()
  subName: string

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User


  @ManyToOne(() => Sub, sub => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub


  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title)
  }
}
