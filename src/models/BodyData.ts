class BodyData {
  id: string;
  userId: string;
  heartRate: number;
  temperature: number;
  timeRecorded: number;
  hasFell: boolean;

  constructor(
    id: string,
    userId: string,
    heartRate: number,
    temperature: number,
    timeRecorded: number,
    hasFell: boolean
  ) {
    this.id = id;
    this.userId = userId;
    this.heartRate = heartRate;
    this.temperature = temperature;
    this.timeRecorded = timeRecorded;
    this.hasFell = hasFell;
  }
}

export default BodyData;
