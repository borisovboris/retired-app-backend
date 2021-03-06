import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class AuthService {

    constructor(private ts: TeacherService, private jwtService: JwtService){}
    
    public async login(username: string, password: string): Promise<string> {
        const result = await this.ts.comparePasswords(username, password);
        
        if(result) {
            const data = await this.ts.findByUsername(username);
            const token = await this.jwtService.signAsync(data);
            return token;
        }

        return null;
    }

}
