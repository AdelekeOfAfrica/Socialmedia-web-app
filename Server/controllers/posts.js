import Post from "../models/Posts.js";
import userId from "../models/User.js";

export const createPost = async (req,res) =>{
    try{
        const {userId, description, picturePath} =req.body;
        
        const  user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{
                "someid":true,
            },
            comments:[]
        });

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);

    }catch(err){
        res.status(409).json({message: err.message})
    }
}

// READ
export const getFeedPosts = async (req,res) =>{
    try{
        
        const post = await Post.find();
        res.status(200).json(post);
    }catch(error){
        res.status(404).json({message:err.message});
    }
}

export const getUserPosts =async (req,res) =>{
    try{
        
        const {userId} = req.params;
        const posts = await Post.find({userId});
        res.status(200).json(posts);
    }catch(error){
        res.status(404).json({message:err.message});
    }
}

//UPDATE
export const likePost = async (req,res) =>{
    try{

        const  {id } = req.params;
        const  {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);


        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.like.set(userId, true);

            const updatedPost = await Post.findByIdAndUpdate(id,
                {likes:post.likes},
                {new:true},
            );
        }
        res.status(200).json(updatedPost);
    }catch(error){
        res.status(404).json({message:err.message});
    }

}