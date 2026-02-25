import { Controller, Get, Put, Param, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BusinessesService } from './businesses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(
    private businessesService: BusinessesService,
    private prisma: PrismaService,
  ) {}

  // === PUBLIC ENDPOINTS (no auth required) ===

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Obter negocio por slug (publico)' })
  async findBySlug(@Param('slug') slug: string) {
    const business = await this.businessesService.findBySlug(slug);
    if (!business) throw new NotFoundException('Negocio nao encontrado');
    return {
      id: business.id,
      name: business.name,
      slug: business.slug,
      phone: business.phone,
      logoUrl: business.logoUrl,
      city: business.city,
      state: business.state,
      openingHours: business.openingHours,
    };
  }

  @Get('slug/:slug/services')
  @ApiOperation({ summary: 'Servicos ativos do negocio (publico)' })
  async findServicesBySlug(@Param('slug') slug: string) {
    const business = await this.businessesService.findBySlug(slug);
    if (!business) throw new NotFoundException('Negocio nao encontrado');
    return this.prisma.service.findMany({
      where: { businessId: business.id, isActive: true },
      select: { id: true, name: true, description: true, category: true, duration: true, price: true },
      orderBy: { name: 'asc' },
    });
  }

  // === PROTECTED ENDPOINTS ===

  @Get('current')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter negocio atual' })
  async getCurrent(@Request() req: any) {
    return this.businessesService.findOne(req.user.businessId);
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatisticas do dashboard' })
  async getDashboard(@Request() req: any) {
    return this.businessesService.getDashboardStats(req.user.businessId);
  }

  @Put('current')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar negocio atual' })
  async updateCurrent(@Request() req: any, @Body() data: any) {
    return this.businessesService.update(req.user.businessId, data);
  }

  @Put('settings')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar configuracoes' })
  async updateSettings(@Request() req: any, @Body() settings: any) {
    return this.businessesService.updateSettings(req.user.businessId, settings);
  }
}
