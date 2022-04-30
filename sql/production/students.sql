/*새로운 학생 insert*/
--학생 번호, 이름, 생일, 주소, 성별, 집번호, 폰번호, 이메일, 신급
INSERT INTO STUDENTS
  (student_id, student_name, sex, student_state, address, home_number, phone_number, email, birthday)
VALUES('00000', '홍길동', 'F', '1', '서울시 ~', '031-623-5626', '010-5162-5626', 'dyl1229@naver.com', TO_DATE('1998-12-29', 'yyyy-mm-dd'));


--학생 번호, 부서, 학년, 반, 이수 년도
--현재로서는 이수년도 데이터가 없기 때문에 첫 줄과 둘째 줄의 academy_year 부분을 빼주시면 됩니다.
insert into belong_to(student_id, my_group, grade, my_class, academy_year, idx)
values(${student_id}, ${my_group}, ${grade}, ${my_class}, ${academy_year},
(
  SELECT MAX(idx)+1
  FROM belong_to
)
);

/*학생 정보 update(2개 쿼리문 실행 필요)*/
--1. null값 상관 없이 무조건 update
--ID 기준으로 이름/성별/신급 업데이트
UPDATE STUDENTS
SET
	student_name='홍길동', sex='M', student_state='1'
WHERE student_id = 1234;

--ID 기준으로 부서/학년/반 업데이트
UPDATE BELONG_TO
SET
	my_group='1', grade='1', my_class='2'
WHERE student_id = 1234;

--2. NULL인지 확인 후 업데이트
--이름, 성별 상태
UPDATE STUDENTS
  SET student_name = NVL('이도연', student_name),
      sex = NVL('', sex),
      student_state = NVL('5', student_state)
WHERE student_id = 124;

--부, 학년, 반
UPDATE BELONG_TO
  SET my_group = NVL('1', my_group),
      grade = NVL('', grade),
      my_class = NVL('3', my_class)
WHERE student_id = 124;

/*학생 정보를 기준으로 ID 변경*/
UPDATE STUDENTS
SET student_id = '111'
WHERE student_id = (
	SELECT student_id
	FROM STUDENT_LIST
	WHERE student_name = '테스트'
        AND sex = 'F'
        AND student_state = '1'
        AND my_group = '1'
        AND grade = '1'
        AND my_class = '1'
);


