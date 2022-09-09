const is_class_member = (member, grade_id, class_id) => {
  return member.grade == grade_id && member.class == class_id
}

const is_role = (member, role) => {
  return member.role == role
}

const get_student_array = (member_array) => {
  return member_array.filter((member) => is_role(member, 'student'))
}

const get_teacher_array = (member_array) => {
  return member_array.filter((member) => is_role(member, 'teacher'))
}

const get_class_member_array = (member_array, grade_id, class_id) => {
  return member_array.filter((member) => is_class_member(member, grade_id, class_id))
}

const count_by_gender = (attendance_array, member_array, gender) => {
  const gender_id_array = member_array.filter((member) => member.sex === gender).map((member) => member.id)
  return attendance_array.filter((id) => gender_id_array.includes(id)).length
}

const count_teacher = (attendance_array, member_array) => {
  const teacher_id_array = member_array.map((member) => member.id)
  return attendance_array.filter((id) => teacher_id_array.includes(id)).length
}

export const count_student_member_by_gender = (attendance_array, member_array, grade_id = null, class_id = null) => {
  // Null check
  if (!attendance_array || !member_array) {
    return {
      M: 0,
      F: 0,
    }
  }

  let target_member_array = get_student_array(member_array)
  if (grade_id && class_id) {
    target_member_array = get_class_member_array(target_member_array, grade_id, class_id)
  }

  const member_counts = {
    M: count_by_gender(attendance_array, target_member_array, 'M'),
    F: count_by_gender(attendance_array, target_member_array, 'F'),
  }
  return member_counts
}

export const count_teacher_member = (attendance_array, member_array) => {
  // Null check
  if (!attendance_array || !member_array) {
    return 0
  }
  
  const teacher_array = get_teacher_array(member_array)
  const teacher_count = count_teacher(attendance_array, teacher_array)
  return teacher_count
}
