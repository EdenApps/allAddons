# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import models, _
from eden.exceptions import UserError


class StockLot(models.Model):
    _inherit = 'stock.lot'

    def _check_create(self):
        active_mo_id = self.env.context.get('active_mo_id')
        if active_mo_id:
            active_mo = self.env['mrp.production'].browse(active_mo_id)
            if not active_mo.picking_type_id.use_create_components_lots:
                raise UserError(_('You are not allowed to create or edit a lot or serial number for the components with the operation type "Manufacturing". To change this, go on the operation type and tick the box "Create New Lots/Serial Numbers for Components".'))
        return super()._check_create()
