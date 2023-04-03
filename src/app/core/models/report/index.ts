export interface reportForm {
  dateStart: string,
  dateEnd: string,
  type: 'user' | 'hardware' | 'software' | 'incident' | 'assigment' | 'notification'
}
