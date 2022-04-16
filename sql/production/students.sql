/*새로운 학생 insert*/
INSERT INTO STUDENTS
--(ssid, sname, bday, addr, sex, home_no, phone_no, email, sstate)
VALUES
(5626, '이도연', TO_TIMESTAMP('1998-12-29'), '서울시 양천구 목동서로 삐삐아파트',
'F', NULL, '010-5162-5626', 'dyl1229@naver.com', '1');

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


