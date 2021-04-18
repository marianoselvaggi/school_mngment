import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './create-lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { StudentService } from '../student/student.service';


@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ){}

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,
    ) {
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('lessonInput') lessonInput: CreateLessonInput
    ):Promise<Lesson> {
        return this.lessonService.createLesson(lessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
    ) {
        const { lessonId, studentsId } = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId,studentsId);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}