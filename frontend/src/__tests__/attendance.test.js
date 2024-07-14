import {
    calculateSubjectAttendancePercentage,
    groupAttendanceBySubject,
    calculateOverallAttendancePercentage
  } from '../components/attendanceCalculator';
  
  describe('calculateSubjectAttendancePercentage', () => {
    test('should return 0 if totalSessions is 0', () => {
      const result = calculateSubjectAttendancePercentage(10, 0);
      expect(result).toBe(0.00);
    });
  
    test('should return 0 if presentCount is 0', () => {
      const result = calculateSubjectAttendancePercentage(0, 10);
      expect(result).toBe(0.00);
    });
  
    test('should return the correct percentage', () => {
      const result = calculateSubjectAttendancePercentage(7, 10);
      expect(result).toBe(70.00);
    });
  
    test('should handle decimal places correctly', () => {
      const result = calculateSubjectAttendancePercentage(1, 3);
      expect(result).toBe(33.33);
    });
  });
  
  describe('groupAttendanceBySubject', () => {
    const sampleAttendance = [
      {
        subName: { subName: 'Math', sessions: 5, _id: '1' },
        status: 'Present',
        date: '2024-01-01'
      },
      {
        subName: { subName: 'Math', sessions: 5, _id: '1' },
        status: 'Absent',
        date: '2024-01-02'
      },
      {
        subName: { subName: 'Science', sessions: 3, _id: '2' },
        status: 'Present',
        date: '2024-01-01'
      }
    ];
  
    test('should group attendance by subject correctly', () => {
      const result = groupAttendanceBySubject(sampleAttendance);
      expect(result).toEqual({
        Math: {
          present: 1,
          absent: 1,
          sessions: 5,
          allData: [
            { date: '2024-01-01', status: 'Present' },
            { date: '2024-01-02', status: 'Absent' }
          ],
          subId: '1'
        },
        Science: {
          present: 1,
          absent: 0,
          sessions: 3,
          allData: [
            { date: '2024-01-01', status: 'Present' }
          ],
          subId: '2'
        }
      });
    });
  });
  
  describe('calculateOverallAttendancePercentage', () => {
    const sampleAttendance = [
      {
        subName: { subName: 'Math', sessions: 5, _id: '1' },
        status: 'Present',
        date: '2024-01-01'
      },
      {
        subName: { subName: 'Math', sessions: 5, _id: '1' },
        status: 'Absent',
        date: '2024-01-02'
      },
      {
        subName: { subName: 'Science', sessions: 3, _id: '2' },
        status: 'Present',
        date: '2024-01-01'
      }
    ];
  
    test('should return 0 if totalSessionsSum is 0', () => {
      const result = calculateOverallAttendancePercentage([]);
      expect(result).toBe(0);
    });
  
    test('should return the correct overall attendance percentage', () => {
      const result = calculateOverallAttendancePercentage(sampleAttendance);
      expect(result).toBeCloseTo(25, 4); // Assuming the calculation is (2 / 7) * 100
    });
  });
  