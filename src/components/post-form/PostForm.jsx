/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import {Button, Input, PostStatus, Rte} from "../index";
import appwriteStorage from '../../appwrite/appwriteStorage.js'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

function PostForm({post}) {
    const {register, handleSubmit, setValue, control, getValues, watch} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    

    const onSubmit = async (data) => {
        // console.log(data);
        const file = data.image[0] ? await appwriteStorage.uploadFile(data.image[0]) : null;
        if(post){
            // const file = data.image[0] ? await appwriteStorage.uploadFile(data.image[0]) : null;

            if(file) await appwriteStorage.deleteFile(post.thumbnail);

            const dbPost = await appwriteStorage.updatePost(post.$id, {
                ...data,
                thumbnail: file ? file.$id : undefined
            });

            if(dbPost) navigate(`/post/${dbPost.$id}`);
        }else{
            if(file){
                const fileId = file.$id;
                data.thumbnail = fileId;

                const dbPost = await appwriteStorage.createPost({
                    ...data,
                    userId: userData.$id,
                    author: userData.name,
                })
                console.log(dbPost);
                if(dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((inputValue) => {
        if(inputValue && typeof inputValue==="string")
            return inputValue
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-zA-Z\d\s]+/g,"-")
                        .replace(/\s/g,"-");
        return "";
    },[])

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name==='title'){
                setValue("slug",slugTransform(value.title), {shouldValidate: true});
            }
        });

        return ()=> subscription.unsubscribe();
    },[watch, slugTransform, setValue])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
        <div className="md:w-2/3 sm:w-full sm:mb-4 px-2">
            <Input
                label = "Title: "
                placeholder = "Title"
                className="mb-4"
                {...register("title",{required: true})}
            />
            <Input
                label = "Slug: "
                placeholder = "Slug"
                className="mb-4"
                {...register("slug",{required: true})}
                onInput = {(e)=> {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
            />
            <Rte label="Content: " name="content" control ={control} defaultValue={getValues("content")} />
        </div>
        <div className="md:w-1/3 sm:w-full px-2">
            <Input
                label="Thumbnail: "
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {required: !post})}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteStorage.getFilePreview(post.thumbnail)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}

            <PostStatus
                options = {["active","inactive"]}
                label="Status"
                className="mb-4"
                {...register("status",{required: true})}
            />
            <Button
                type="submit"
                bgColor={post? "bg-green-500" : undefined}
                className="w-full"
            >
                {post? "Update": "Submit"}
            </Button>
        </div>
    </form>
  )
}
export default PostForm