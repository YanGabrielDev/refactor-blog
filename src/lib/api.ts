import {join} from 'path'
import fs from "fs"
import matter from 'gray-matter'

const testsDirectory = join(process.cwd(), 'src/_posts')

export function getTeste(){    
  return fs.readdirSync(testsDirectory);
}


export function getPostBySlug(slug: string, fields: string[] = []){
  const realSlug = slug.replace(/\.md$/, '')
  
  const fullPath = join(testsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content} = matter(fileContents)
  console.log(content);

  type  Items = {
    [key: string]: string
  }
  const items: Items = {}

  fields.forEach((field) => {
    if(field === 'slug'){
      items[field] = realSlug
    }
    if(field === 'content'){
      items[field] = content
    }
    if(typeof data[field] !== 'undefined'){
      items[field] = data[field]
    }
  })
  
  return items
}

export function getAllMarks(fields: string[] = []){
  const slugs = getTeste()
  const posts = slugs.map((slug) => getPostBySlug(slug, fields))
  return posts
}