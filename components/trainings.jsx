import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'

import { useBoundStore } from '@/store'
import { is_future } from '../utils/common'
import { Headline } from './common'
import { useMembers, useTrainingsByNameDate, useTrainingsInfo } from './swr'

const Trainings = () => {
  const current_group = useBoundStore((state) => state.group)
  const { member_array } = useMembers(current_group)
  const { trainings_info_array, is_loading, is_error, mutate } = useTrainingsInfo()
  const [name_index, set_name_index] = useState(-1)
  const [date_index, set_date_index] = useState(-1)
  const { members } = useTrainingsByNameDate(
    0 <= name_index ? trainings_info_array[name_index].name : '',
    0 <= name_index && 0 <= date_index ? trainings_info_array[name_index].date_array[date_index] : '',
  )
  const [create_target, set_create_target] = useState('')
  const [target_input, set_target_input] = useState('')
  const on_change_target = (e) => {
    set_target_input(e.target.value)
  }
  const [selected_member_id, set_selected_member_id] = useState('')

  if (is_loading || is_error) {
    return <Headline className="mb-4">교육훈련 목록</Headline>
  }

  const GridTitle = ({ children }) => <h2 className="pb-4 font-semibold text-lg border-b">{children}</h2>

  const AddButton = ({ target }) => (
    <button
      className="py-4 w-full hover:bg-slate-100 cursor-pointer"
      onClick={() => {
        set_create_target(target)
        if (target === 'name') {
          set_name_index(-1)
          set_date_index(-1)
        }
        if (target === 'date') {
          set_date_index(-1)
        }
      }}
    >
      +
    </button>
  )

  return (
    <>
      <Headline className="mb-4">교육훈련 목록</Headline>
      <div className="grid grid-cols-3 text-center">
        <div className="col-span-1 border-r px-4">
          <GridTitle>교육훈련</GridTitle>
          {trainings_info_array.map((training, index) => (
            <div
              key={training.name}
              className={'py-4 hover:bg-slate-100 cursor-pointer ' + (index === name_index ? 'bg-slate-200' : '')}
              onClick={() => {
                set_name_index(index)
                set_date_index(-1)
                set_create_target('')
                set_selected_member_id('')
              }}
            >
              {training.name}
            </div>
          ))}
          {create_target === 'name' ? (
            <div className="flex p-2 bg-slate-200">
              <input
                className="mr-2 border p-1 w-full focus:outline-none"
                value={target_input}
                onChange={on_change_target}
              />
              <button
                onClick={() => {
                  if (window.confirm(`교육훈련 "${target_input}" 등록하기`)) {
                    axios
                      .post('/api/trainings/info', {
                        name: target_input,
                        date_array: [],
                      })
                      .then(() => {
                        alert('등록되었습니다.')
                        mutate()
                        set_name_index(-1)
                        set_date_index(-1)
                        set_target_input('')
                        set_create_target('')
                      })
                      .catch(() => {
                        alert('문제가 발생했습니다.')
                      })
                  }
                }}
              >
                &#x2713;
              </button>
            </div>
          ) : (
            <AddButton target="name" />
          )}
        </div>
        <div className="col-span-1 px-4">
          <GridTitle>날짜</GridTitle>
          {0 <= name_index &&
            trainings_info_array[name_index].date_array.sort(is_future).map((date, index) => (
              <div
                key={index}
                className={'py-4 hover:bg-slate-100 cursor-pointer ' + (index === date_index ? 'bg-slate-200' : '')}
                onClick={() => {
                  set_date_index(index)
                  set_create_target('')
                  set_selected_member_id('')
                }}
              >
                {date}
              </div>
            ))}
          {create_target === 'date' ? (
            <div className="flex p-2 bg-slate-200">
              <input
                className="mr-2 border p-1 w-full focus:outline-none"
                value={target_input}
                onChange={on_change_target}
              />
              <button
                onClick={() => {
                  if (window.confirm(`날짜 "${target_input}" 추가하기`)) {
                    axios
                      .put('/api/trainings/info', {
                        name: trainings_info_array[name_index].name,
                        date_array: [...trainings_info_array[name_index].date_array, target_input],
                      })
                      .then(() => {
                        alert('등록되었습니다.')
                        mutate()
                        set_date_index(-1)
                        set_target_input('')
                        set_create_target('')
                      })
                      .catch(() => {
                        alert('문제가 발생했습니다.')
                      })
                  }
                }}
              >
                &#x2713;
              </button>
            </div>
          ) : (
            0 <= name_index && <AddButton target="date" />
          )}
        </div>
        <div className="col-span-1 border-l px-4">
          <GridTitle>학생</GridTitle>

          {create_target === 'member' ? (
            <div className="flex p-2 bg-slate-200">
              <select
                className="mr-2 border p-1 w-full focus:outline-none"
                value={selected_member_id}
                onChange={(e) => {
                  set_selected_member_id(e.target.value)
                }}
              >
                <option value="" disabled>
                  -
                </option>
                {member_array &&
                  member_array
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((member) => {
                      if (member.role === 'student') {
                        return (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        )
                      }
                    })}
              </select>
              {selected_member_id && (
                <button
                  onClick={() => {
                    if (window.confirm(`학생 추가하기`)) {
                      axios
                        .post('/api/trainings/new', [
                          {
                            name: trainings_info_array[name_index].name,
                            date: trainings_info_array[name_index].date_array[date_index],
                            member_id: selected_member_id,
                          },
                        ])
                        .then(() => {
                          alert('등록되었습니다.')
                          mutate()
                          set_create_target('')
                          set_selected_member_id('')
                        })
                        .catch(() => {
                          alert('문제가 발생했습니다.')
                        })
                    }
                  }}
                >
                  &#x2713;
                </button>
              )}
            </div>
          ) : (
            0 <= date_index && <AddButton target="member" />
          )}
          {members &&
            Object.keys(members).map((key) => {
              if (members[key].group === current_group) {
                return (
                  <Link href={`/admin/members/id/${key}`} key={key}>
                    <div className="py-4 hover:bg-slate-100 cursor-pointer">{members[key].name}</div>
                  </Link>
                )
              }
            })}
        </div>
      </div>
      <ul></ul>
    </>
  )
}

export default Trainings
