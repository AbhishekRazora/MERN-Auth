import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../Firebase'
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js'
import { updateUserProfile } from '../helpers/api-communicator.jsx'

export default function Profile() {
  const dispatch = useDispatch()
  const fileRef = useRef(null)
  const [imagePercent, setImagePercent] = useState(0)
  const [image, setImage] = useState(undefined)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updatedSuccess,setUpdatedSuccess]=useState(false)
  // console.log(image)
  const { currentUser, isLoading, error } = useSelector(state => state.user)


  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])


  const handleFileUpload = async (image) => {
    // console.log(image)

    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress))
      console.log('upload is ' + progress + '% done');
    },
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) =>
            setFormData({ ...formData, photo: downloadURL })
          )
      }
    )



  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    toast.loading("Updating",{id:"update"})
    dispatch(updateUserStart())
    try {
      const updatedData = {
        ...formData,
        id: currentUser.id
      }
      let id=currentUser.id
      const updatedUser = await updateUserProfile(updatedData)
      dispatch(updateUserSuccess(updatedUser))
      setUpdatedSuccess(true)
      toast.success("User Update Successfully",{id:"update"})
    } catch (error) {
      console.log(error)
      dispatch(updateUserFailure(error))
      toast.error("Error in updating the user",{id:"update"})

    }
  }

  return (
    <div className='p-3 mt-2 mx-auto max-w-xl '>

      <h1 className='text-center font-bold text-2xl my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="file" name="" id="" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        <img src={formData.photo || currentUser.photo} alt="profile" onClick={() => fileRef.current.click()} className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' />

        <p className='text-lg self-center'>
          {
            imageError ? (
              <Span className="text-red-700">Error in uploading image (file size must be less than 2 MB and of type image)</Span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className='text-blue-700'>{`Uploading : ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className='text-green-700'>Image uploaded successfully</span>
            ) : (
              " "
            )
          }

        </p>


        <div className='flex flex-col'>

          <label htmlFor="username">Username

          </label>
          <input type="text" name='username' defaultValue={currentUser.username} id="username" className='bg-slate-200 rounded-lg p-3' onChange={handleChange} />
        </div>

        <div className='flex flex-col'>

          <label htmlFor="email">Email

          </label>
          <input type="text" name='email' id='email' defaultValue={currentUser.email} className='bg-slate-200 rounded-lg p-3' onChange={handleChange} />
        </div>

        <div className='flex flex-col'>

          <label htmlFor="password">Password

          </label>
          <input type="text" name='password' id='password' className='bg-slate-200 rounded-lg p-3' onChange={handleChange} />
        </div>

        <button disabled={isLoading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{isLoading ? "Updating..." : "Update"}</button>
        <div className='flex justify-between '>
          <span className='text-red-700 cursor-pointer font-semibold'>Delete Account</span>
          <span className='text-red-700 cursor-pointer font-semibold'>Sign Out</span>
        </div>
        <p className='text-red-700 mt-2'>{error&&error.message}</p>
        <p className='text-green-700 mt-2'>{updatedSuccess&& "User is updated successfully"}</p>

      </form>
    </div>
  )
}
