import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeacherRO } from 'src/teacher/teacher.ro';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class AuthService {

    constructor(private ts: TeacherService, private jwtService: JwtService){}
    
    public async login(username: string, password: string): Promise<string> {
        const result = await this.ts.comparePasswords(username, password);
        
        if(result) {
            const teacher: TeacherRO = await this.ts.findByUsername(username);
            const token = await this.jwtService.signAsync({ id: '' + teacher.id });
            return token;
        }

        return null;
    }

    public async register(teacher) {
       this.ts.create(teacher);
    }

    public validateToken(tokenId: string): Promise<any> {
        return this.jwtService.verifyAsync(tokenId);
    }

}
