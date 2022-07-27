import { createClient } from '@supabase/supabase-js'
import type {PostgrestResponse, PostgrestError} from '@supabase/supabase-js'
//Create Supabase client
const sbUrl = 'https://qkdyjypdpruelatqkwbh.supabase.co'
const sbKey = import.meta.env.VITE_API_KEY
console.log(import.meta.env.VITE_TRY)
const sbClient = createClient(sbUrl, sbKey)
//INTERFACES & TYPES
type Post = {
    id: number,
    created_at: string,
    posted_at?: string,
    post_title: string,
    post_text: string,
    views?: number
  }
  
  type PostResolved = any
  type PostRejected = PostgrestError

/** Functions */
export const sb = {
    /**
 * Get all posts
 * TODO: Paginate, accept currentUser as param
 * @returns {Promise<SupabaseClient>}
 */
 getAllPosts: async function getAllPosts(): Promise<PostResolved | PostRejected> {
 const {data: post, error} = await sbClient
 .from ('BlogPost')
 .select('*')
//TODO: Error Handler
const result = post? post : error
console.log(result)
return result
},
/**
 * Get a post by id
 * @param {string} id
 * @returns {Promise<SupabaseClient>}
 * @memberof sb
 */
getPostById: async function getPostById(id: string): Promise<PostResolved | PostRejected> {
    const {data: post, error} = await sbClient
    .from ('BlogPost')
    .select()
    .ilike('id', id)
   return post? post : error
},
/** */
createNewPost: async function createNewPost(title: string, postText: string) {
    const {data: newPost, error} = await sbClient
    .from ('BlogPost')
    .insert({
        'post_title': title,
        'post_text': postText,
    })
    return newPost ? newPost : error
}
}
/* 
export async function getPostById(id: string): Promise<any> {
    const post = await sbClient
    .from ('BlogPost')
    .select()
    .ilike('id', id)
}

export async function createNewPost(title: string, postText: string) {
    const newPost = await sbClient
    .from ('BlogPost')
    .insert({
        'post_title': 'New Post',
        'post_text': 'New Post Content',
    })

    return newPost
}
 */