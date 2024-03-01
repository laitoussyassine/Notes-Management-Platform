"use client"
import { useParams, useRouter } from 'next/navigation'

const EditNoteId = () => {
  const params = useParams()
  const router = useRouter()
  return (
    <>
      {/* <h1>edit note id :{params.id}</h1>
        <div onClick={() => router.push('/')}>go to notes page</div> */}
    </>
  )
}

export default EditNoteId