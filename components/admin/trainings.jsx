import Link from 'next/link'

const TrainingsCard = () => {
  return (
    <Link href={'/admin/trainings'}>
      <div className="flex flex-col p-4 hover:bg-purple-50 group cursor-pointer items-center">
        <div className="flex flex-col mb-4 rounded bg-purple-100 group-hover:bg-purple-200 w-60 h-60 justify-center items-center">
          <h2 className="mb-4 font-semibold">교육훈련 관리</h2>
        </div>
        <div>
          <h3 className="text-sm text-gray-700">교육훈련</h3>
        </div>
      </div>
    </Link>
  )
}

export default TrainingsCard
