import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './create-lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>
    ) {}

    async createLesson(lessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = lessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        });
        
        return await this.lessonRepository.save(lesson);
    }

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id });
    }

    async getLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find();
    }

    async assignStudentsToLesson(lessonId: string, studentsId: string[]): Promise<Lesson> {
        const lesson = await this.lessonRepository.findOne({id: lessonId});
        if(!lesson.students) {
            lesson.students = [];
        }
        lesson.students = [...lesson.students, ...studentsId];
        return this.lessonRepository.save(lesson);
    }
}
